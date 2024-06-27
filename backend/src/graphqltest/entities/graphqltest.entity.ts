import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Graphqltest {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
