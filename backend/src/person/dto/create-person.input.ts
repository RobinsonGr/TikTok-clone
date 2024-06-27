import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePersonInput {
  @Field()
  email: string;

  @Field()
  fullName: string;

  @Field({ nullable: true })
  biography?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  password: string;
}