import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Person {
  @Field()
  id?: number;

  @Field()
  name: string;

  @Field()
  email?: string;

  @Field({ nullable: true })
  biography?: string;

  @Field({ nullable: true })
  avatar?: string;  // Add this line

  @Field()
  password: string;

  @Field()
  createdOn: Date;

  @Field()
  updatedOn: Date;
}