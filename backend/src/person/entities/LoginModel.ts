import { ObjectType, Field, Int } from '@nestjs/graphql';
//Person model, not the Person itce from prisma
import { Person } from './PersonModel';

export class ErrorType {
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;
}


@ObjectType()
export class LoginResponse {
  @Field(() => Person)
  person: Person;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
