import { InputType, Field } from '@nestjs/graphql';
import { MediaVariation } from 'src/types';

@InputType()
export class CreateMediaInput {
  @Field()
  type: MediaVariation;

  @Field()
  title: string;

  @Field()
  path: string;

  @Field()
  projectId: string;

  @Field(() => [String])
  viewTypes: string[];
}
