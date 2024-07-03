import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';



@Module({
  imports: [JwtModule.registerAsync({
    /* I'll use the env variables here, so to do that i got to inject configService directly using useFactory (as it were a controller/resolver gpql)), the configmodule is already available from app.modules*/
   inject: [ConfigService],
   useFactory: async (configService: ConfigService) => ({
     secret: configService.get<string>('JWT_SECRET')
   })
 })],
  providers: [AuthService]
})
export class AuthModule {}


