import { CreateGraphqltestInput } from './create-graphqltest.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGraphqltestInput extends PartialType(CreateGraphqltestInput) {
  @Field(() => Int)
  id: number;
}
