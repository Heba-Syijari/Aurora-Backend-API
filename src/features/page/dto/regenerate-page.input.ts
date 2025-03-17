import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RegeneratePageInput {
  @Field(() => Int)
  pageId: number;

  @Field()
  projectId: string;
}
