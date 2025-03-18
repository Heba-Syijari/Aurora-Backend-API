import { Field, InputType, Int } from '@nestjs/graphql';
import { ProjectDesignInput } from './create-project';

@InputType()
export class UpdateProjectSettingsInput extends ProjectDesignInput {
  @Field()
  projectId: string;

  @Field(() => Int)
  pageId: number;

  @Field()
  pageTitle: string;

  @Field()
  pageDescription: string;
}
