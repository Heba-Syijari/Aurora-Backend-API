import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['id', 'email']),
) {
  @Field({ nullable: true })
  verified?: boolean;
}
