import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdatePasswordInput {
  @IsNotEmpty()
  @Field()
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Field()
  newPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Field()
  confirmNewPassword: string;
  // TODO: should handle confirm password
}
