import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { ErrorType } from './error.type';

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}