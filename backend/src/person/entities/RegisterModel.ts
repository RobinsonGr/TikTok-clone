import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class RegisterModel {
  @Field(() => User, { nullable: true }) // Assuming User is another ObjectType you have
  user?: User;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}