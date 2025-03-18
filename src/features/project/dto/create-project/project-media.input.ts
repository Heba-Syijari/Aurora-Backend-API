import { InputType, Field } from '@nestjs/graphql';
import { MediaVariation } from 'src/types';

@InputType()
export class ProjectMediaInput {
  @Field()
  type: MediaVariation;

  @Field()
  title: string;

  @Field()
  path: string;
}
