import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {join } from 'path';
import { PersonModule } from './person/person.module';
import { GraphqltestModule } from './graphqltest/graphqltest.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res })
      //It didn't set the explictly the playground option as true, but it still works 
    }),
    // With ConfigModule It'll be able to access some enviroment variables, important for auth using configservice.get 
    ConfigModule.forRoot({isGlobal: true}),
    PersonModule,
    PrismaModule,
    GraphqltestModule,
    AuthModule
  ]
})
export class AppModule {}
