import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class DeleteMediaInput {
  @Field(() => Int)
  id: number;

  @Field()
  projectId: string;
}
