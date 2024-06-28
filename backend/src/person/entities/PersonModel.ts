import { ObjectType, Field, Int } from '@nestjs/graphql';

//For number is required especity the type because could be floats

@ObjectType()
export class Person {
  @Field(type => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  biography?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  password: string;
}