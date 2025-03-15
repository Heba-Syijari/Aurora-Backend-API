import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsNotFakeEmail } from 'src/common/validators';
import { Gender, gender } from 'src/types';

@InputType()
export class RegisterInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsEmail({ blacklisted_chars: '+' })
  @IsNotFakeEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Field()
  password: string;

  //// may should add password confirm
  // @IsNotEmpty()
  // confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  phoneNumber: string;

  @IsNotEmpty()
  @IsIn(gender)
  @Field()
  gender: Gender;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  imagePath?: string;
}
