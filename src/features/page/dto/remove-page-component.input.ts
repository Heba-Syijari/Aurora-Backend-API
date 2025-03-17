import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RemovePageComponentInput {
  @Field(() => Int)
  pageId: number;

  @Field(() => Int)
  componentId: number;
}
