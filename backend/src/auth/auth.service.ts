import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {JwtService} from "@nestjs/jwt";
import { Response, Request } from 'express';

//I set this in the root of the config , in that way  it is possible to access to the enviroment variables in any partr
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService
    ) {}

    async refreshToken(req: Request, res: Response) : Promise<string> {
        //este header va a estar en el header del token
        //este es de long-live a diferencia del acess token que es short-live
        const refreshToken = req.cookies['refresh_token'];


        if(!refreshToken) {
            //aqui va la exepcion de unauthorized
        }

        let payload;
        //usar los metodos de jwt son async, por eso el try catch block
        try {

            payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('REFRESH_TOKEN_SECRET')
            });
        } catch (err) {
            ///DONT FORGET TO THROW THE UNAUTHORIZEDEXEPTION 
        }

        //after validating the refresh token, now it's required to retrieve the user, check and validate it
        const userExists = await this.prisma.person.findUnique({
            where: {id: payload.sub},
        });

        const expiresIn = 15000; //those are seconds
        const expiration = Math.floor(Date.now() / 1000) + expiresIn;
        const accessToken = this.jwtService.sign(
            {...payload, exp: expiration},
            {
                secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
                expiresIn: '7d'
            }
        )

        let refreshToken2;

        //es similar al usar express, simplemente nestjs tiene objetos bult=in de Response and Request y es lo mismo manipulando estos objetos de https para modificar tokens y anadir headers
        req.cookies('access_token', accessToken, {httpOnly: true})
       // req.cookies('refresh_token', refreshToken2)
    }




}
