import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddPageComponentInput {
  @Field(() => Int)
  pageId: number;

  @Field(() => Int)
  componentId: number;

  @Field(() => Int)
  order: number;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  generateAI?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  regenerate?: boolean;
}
