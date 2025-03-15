import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class VerifyUserEmailInput {
  @IsNotEmpty()
  @Field()
  token: string;
}
