import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {join } from 'path';
import { PersonModule } from './person/person.module';
import { GraphqltestModule } from './graphqltest/graphqltest.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    PersonModule,
    PrismaModule,
    GraphqltestModule
  ]
})
export class AppModule {}
