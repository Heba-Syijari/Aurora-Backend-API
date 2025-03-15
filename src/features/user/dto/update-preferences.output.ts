import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdatePreferencesOutput {
  @Field(() => Boolean)
  success: boolean;
}
