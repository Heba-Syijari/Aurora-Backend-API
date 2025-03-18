import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PluginVariation } from 'src/types';

@ObjectType()
export class ProjectPlugin {
  @Field(() => Int)
  id: number;

  @Field()
  key: string;

  @Field()
  value: string;

  @Field()
  variation: PluginVariation;

  @Field()
  projectId: string;
}
