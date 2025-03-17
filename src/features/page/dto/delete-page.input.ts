import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DeletePageInput {
  @Field(() => Int)
  pageId: number;

  @Field()
  projectId: string;
}
