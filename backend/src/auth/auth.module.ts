import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {jwtConstants} from './constants';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './passportConfig/jwt.strategy';


@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    JwtModule.registerAsync({
    /* I'll use the env variables here, so to do that i got to inject configService directly using useFactory (as it were a controller/resolver gpql)), the configmodule is already available from app.modules*/
   inject: [ConfigService],
   useFactory: async (configService: ConfigService) => {
    const constants = await jwtConstants(configService);
     return {
      secret: constants.secret
     }
   }
 })],
  providers: [AuthService, JwtStrategy],
  //to be able to use guard auth in person resolve, it's needed to export jwtModule cos im injecting it in guardAuth, but im no using it explicitly in person.resolver 

  //Also, this is an extration of the documentation = when a module (like AuthModule) exports a provider or another module, it makes those exports available to any module that imports it. This is called a transitive dependency.
  exports: [AuthService, JwtModule]
})
export class AuthModule {}


