import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class ResendVerificationEmailInput {
  @IsNotEmpty()
  @Field()
  @IsEmail()
  email: string;
}
