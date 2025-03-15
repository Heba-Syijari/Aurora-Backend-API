import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdatePasswordResponse {
  @Field(() => Boolean)
  success: boolean;
}
