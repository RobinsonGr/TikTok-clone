import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {jwtConstants} from './constants';


@Module({
  imports: [JwtModule.registerAsync({
    /* I'll use the env variables here, so to do that i got to inject configService directly using useFactory (as it were a controller/resolver gpql)), the configmodule is already available from app.modules*/
   inject: [ConfigService],
   useFactory: async (configService: ConfigService) => {
    const constants = await jwtConstants(configService);
     return {
      secret: constants.secret
     }
   }
 })],
  providers: [AuthService]
})
export class AuthModule {}


