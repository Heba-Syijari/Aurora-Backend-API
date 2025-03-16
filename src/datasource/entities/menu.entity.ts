import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Menu {
  @Field(() => Int)
  id: number;

  @Field()
  label: string;

  @Field()
  place: string;

  @Field()
  projectId: string;

  @Field(() => Int, { nullable: true })
  parentId?: number;

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  section?: string;

  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field(() => [Menu], { nullable: true })
  children?: Menu[];

  @Field(() => String, { nullable: true })
  pageSlug?: string;
}
