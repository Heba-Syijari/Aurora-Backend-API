import { InputType, Field } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
import { Gender, gender } from 'src/types';

@InputType()
export class CreateUserInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @IsIn(gender)
  @Field()
  gender: Gender;

  @Field({ nullable: true })
  imagePath?: string;
}
