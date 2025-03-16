import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class DeleteMenuInput {
  @Field(() => Int)
  id: number;

  @Field()
  projectId: string;
}
