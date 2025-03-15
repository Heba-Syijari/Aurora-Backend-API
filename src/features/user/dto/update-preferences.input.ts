import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdatePreferencesInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  imageModel: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  textModel: string;
}
