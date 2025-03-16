import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MediaVariation } from 'src/types';

@ObjectType()
export class Media {
  @Field(() => Int)
  id: number;

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
