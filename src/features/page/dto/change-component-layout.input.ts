import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ChangeComponentLayoutInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  pageId: number;

  @Field(() => Int)
  componentId: number;
}
