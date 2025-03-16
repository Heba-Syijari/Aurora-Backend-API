import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMenuInput {
  @Field()
  label: string;

  @Field()
  place: string;

  @Field()
  projectId: string;

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  section?: string;

  @Field(() => Int, { nullable: true })
  parentId?: number;

  @Field(() => Int, { nullable: true })
  pageId?: number;
}
