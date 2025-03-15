import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @IsNotEmpty()
  @Field()
  token: string;

  @IsNotEmpty()
  @Field()
  code: string;

  @IsNotEmpty()
  @Field()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Field()
  password: string;
}
