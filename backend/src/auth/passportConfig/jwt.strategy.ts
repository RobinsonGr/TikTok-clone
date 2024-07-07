import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {ed
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService
  ) {
    // it'll use the main PAssportStrategy class from jwtStrategy, so it's important to pass the config directly to the parent classs using super

    super({
      // Extrating the token from headers
      jwtFromRequest: ExtractJwt.fromExtractors([
        // access to the request obj, also i did this from graphql in authservice
        (request: Request) => {
          return request.cookies?.access_token;
        },
      ]),
      ignoreExpiration: false,
      //I cant use await/async inside super, so 'ill create an isolated method and then reasing secretOrKey with the key
      secretOrKey: JwtStrategy.getSecret(configService),
    });
  }
  // I'm using the jwtConstant  recommended by nestjt for modularity and share the token across different services here,that why im injecting configService, to be able to use the get method to acess to the method. in authModule i do the same, but using useFactory to inject it cos isn't a class

  private static async getSecret(configService: ConfigService): Promise<string> {
    const jwtConfig = await jwtConstants(configService);
    return jwtConfig.secret;
  }

  // after the token has been verified, it will check the user auth. Something similar to serialization/deserialization in passport local
  async validate(payload: any) {
    const personExists = await this.prisma.person.findUnique({
      where: { id: payload.sub },
    });

    if (!personExists) {
      throw new UnauthorizedException();
    }

    return personExists;
  }
}