import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { ErrorType } from './error.type';

@ObjectType()
export class RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}