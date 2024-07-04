//BadreqstExep (Itll throw 400 bad request) and Unauthexept(throwing 400 unauth) belong to nestjs's exeption filters
import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from 'express';
import { Person } from '@prisma/client';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

//I set this in the root of the config , in that way  it is possible to access to the enviroment variables in any partr
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) { }

  //this is to renew the token after access token's time is up
  async refreshToken(req: Request, res: Response): Promise<string> {
    //we start retreving the refreshToken, (the long-live one, they're the same, the onyl difference is it has more expiration time than the access token and less claims in the payload, it is for retrieve the access token when his time is up)
    const refreshToken = req.cookies['refresh_token'];


    if (!refreshToken) {
      //it will throw an 400 indicating wihtout auth/acess
      throw new UnauthorizedException('Refresh token wasnt found')
    };

    let payload;
    try {
      payload = this.jwtService.verify(refreshToken, {
        //I set this configService in the app's module, so i'm able to get the enviroment variables directly
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET')
      });
    } catch (err) {
      throw new UnauthorizedException('Refresh token wasnt found')
    }

    //after validating the refresh token, now it's required to retrieve the user, check and validate it
    const userExists = await this.prisma.person.findUnique({
      where: { id: payload.sub },
    });

    if (!userExists) {
      throw new BadRequestException('user doesnt exist anymore')
    }

    const expiresIn = 20000; //those are seconds
    const expiration = Math.floor(Date.now() / 1000) + expiresIn;
    const accessToken = this.jwtService.sign(
      { ...payload, exp: expiration },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '6d'
      }
    );

    //It's similar to using Express; NestJS simply has built-in objects for Response and Request, and it's the same when manipulating these HTTP objects to modify tokens and add headers
    res.cookie('access_token', accessToken, { httpOnly: true })

    return accessToken
  };

  

  //GENERATEAUTH prisma automatically  generate types based on what was defined in the tables
  private async generateAuthTokens(person: Person, res: Response) {
    const payload = { name: person.name, sub: person.id }

    const accessToken = this.jwtService.sign(
      //It won't defined the secret here and the refresh token cos i already defined it in jwtregister, so it's redundant
      payload,
      { expiresIn: '200sec' }
    );

    const refreshToken = this.jwtService.sign(
      //I won't defined the secret here and the refresh token cos i already defined it in jwtregister, so it's redundant
      payload,
      { expiresIn: '7d' }
    );


    //placing the tokens in the headers
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });

    return {person};
  }

  async signUp(personData: SignUpDto, res: Response) {
    const existingUser = await this.prisma.person.findUnique({ where: { email: personData.email } });

    //automatically results in a 409 Conflict htpp status.
    if (existingUser) throw new ConflictException('Email already taken');

    const hashedPassword = await bcrypt.hash(personData.password, 10);
    const newPerson = await this.prisma.person.create({
      data: {
        name: personData.name,
        email: personData.email,
        password: hashedPassword,
      }
    });

    return this.generateAuthTokens(newPerson, res)
  };

  private async authenticateUser({ email, password }: SignInDto): Promise<Person> {
    const existingPerson = await this.prisma.person.findUnique({ where: { email } });

    if (!existingPerson || !(await bcrypt.compare(password, existingPerson.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return existingPerson;
  };

  async logIn(credentials: SignInDto, res: Response) {
    const personValidated = await this.authenticateUser(credentials)

    return this.generateAuthTokens(personValidated, res)
  }

async logout(res: Response): Promise<string> {
  ['access_token', 'refresh_token'].forEach(token => res.clearCookie(token));
  return 'Logout successful';
} 

};

