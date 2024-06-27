import { Module } from '@nestjs/common';
import { GraphqltestService } from './graphqltest.service';
import { GraphqltestResolver } from './graphqltest.resolver';

@Module({
  providers: [GraphqltestResolver, GraphqltestService],
})
export class GraphqltestModule {}
