import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectAudience {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  projectId: string;

  @Field(() => [String])
  age: string[];

  @Field(() => [String])
  gender: string[];


  @Field(() => [String], { nullable: true })
  organizations?: string[];

  @Field(() => [String], { nullable: true })
  countries?: string[];
}
