import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RemoveContactMessageInput {
  @Field(() => Int)
  id: number;

  @Field()
  projectId: string;
}
