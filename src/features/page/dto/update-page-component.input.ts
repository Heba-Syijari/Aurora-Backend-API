import { InputType, Field, Int } from '@nestjs/graphql';
import { JSONScalar } from 'src/common/graphql/scalars';

@InputType()
export class UpdatePageComponentInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  pageId: number;

  @Field(() => JSONScalar)
  data: any;
}
