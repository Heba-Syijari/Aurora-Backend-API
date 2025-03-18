import { Field, InputType } from '@nestjs/graphql';
import {
  LanguageTypeVariation,
  PluginVariation,
  ProjectTypeVariation,
} from 'src/types';
import { ComponentInput } from '../../../components/dto/component.input';
import { IntellectualPropertyInput } from './intellectual-property.input';
import { ProjectAudienceInput } from './project-audience.input';
import { ProjectDesignInput } from './project-design.input';
import { ProjectMediaInput } from './project-media.input';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field()
  purpose: string;

  @Field(() => Boolean)
  generateAI: boolean;

  @Field()
  type: ProjectTypeVariation;

  // --- story ------
  @Field()
  description: string;

  @Field(() => [String])
  keywords: string[];

  // --- info ------
  @Field(() => [String])
  similarWebsites: string[];

  @Field()
  websiteLocation: string;

  @Field()
  mainLanguage: LanguageTypeVariation;

  @Field(() => [ComponentInput])
  sections: ComponentInput[];

  // --- intellectual property ------
  @Field(() => IntellectualPropertyInput)
  intellectualProperty: IntellectualPropertyInput;

  // --- media ------
  @Field(() => [ProjectMediaInput])
  media: ProjectMediaInput[];

  // --- audience ------
  @Field(() => ProjectAudienceInput)
  audience: ProjectAudienceInput;

  // --- design ------
  @Field(() => ProjectDesignInput)
  design: ProjectDesignInput;

  // --- plugins ------
  @Field(() => [String])
  plugins: PluginVariation[];
}
