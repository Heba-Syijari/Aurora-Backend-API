import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class RequestRecoverPasswordInput {
  @IsNotEmpty()
  @Field()
  @IsEmail()
  email: string;
}
