import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserUsageOutput {
  @Field(() => Int)
  projectsCount: number;

  @Field(() => Boolean)
  hasOneProjectFreeTrial: boolean;
}
