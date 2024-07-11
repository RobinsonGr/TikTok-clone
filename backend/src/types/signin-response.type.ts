import { ObjectType, Field } from '@nestjs/graphql';
import { Person } from './person-model.type';
import { ErrorType } from './error.type';

@ObjectType()
export class SignInResponse {
  @Field(() => Person)
  person: Person;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

