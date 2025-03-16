import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ComponentInput {
  @Field(() => Int)
  componentId: number;

  @Field(() => Int)
  order: number;
}
