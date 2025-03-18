import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ProjectAudienceInput {
  @Field(() => [String])
  age: string[];

  @Field(() => [String])
  gender: string[];

  @Field(() => [String], { nullable: true })
  organizations?: string[];

  @Field(() => [String], { nullable: true })
  countries?: string[];
}
