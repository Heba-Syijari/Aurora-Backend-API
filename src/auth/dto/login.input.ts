import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @IsEmail({ blacklisted_chars: '+' })
  @IsNotEmpty()
  @Field()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Field()
  password: string;
}
