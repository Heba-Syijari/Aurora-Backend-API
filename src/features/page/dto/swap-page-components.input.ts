import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SwapPageComponentsInput {
  @Field(() => Int)
  pageId: number;

  @Field(() => [Int])
  componentsIds: number[];
}
