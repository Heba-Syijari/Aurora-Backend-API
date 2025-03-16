import { ContentGeneratorHeroService } from 'src/features/content-generator/service/content-generator-hero.service';

import { HeroThreeContent } from 'src/features/content-generator/types';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import { ButtonData, TextData } from '../../../types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  title: TextData;
  description: TextData;
  button: ButtonData;
};

export class HeroThreeVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorHeroService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    if (!input.generateAI) return this.getDefaultData(input.mainLanguage);

    // return content use AI
    const contentButton = {
      [LanguageType.english]: 'Learn more',
      [LanguageType.arabic]: 'اعرف المزيد',
    };
    const content = await this.getContent(input);
    const output: Output = {
      title: { text: content.title, color: Color.primaryMain },
      description: { text: content.description, color: Color.textSecondary },
      button: {
        color: Color.primaryContrastText,
        backgroundColor: Color.primaryMain,
        text: contentButton[input.mainLanguage],
        linkTo: '',
      },
    };

    return output;
  }

  private getDefaultData(language: LanguageTypeVariation): Output {
    const content = {
      [LanguageType.english]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          linkTo: '',
          text: 'Learn more',
        },
        description: {
          color: 'text.secondary',
          text: 'Join User on a fun, simple journey through Different teachings and values.',
        },
        title: {
          color: 'text.primary',
          text: 'Different Learning Adventure',
        },
      },
      [LanguageType.arabic]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          linkTo: '',
          text: 'اعرف المزيد',
        },
        description: {
          color: 'text.secondary',
          text: 'انضم إلى المستخدم في رحلة ممتعة وبسيطة من خلال تعاليم وقيم مختلفة.',
        },
        title: {
          color: 'text.primary',
          text: 'مغامرة تعليمية مختلفة',
        },
      },
    };
    return { ...content[language] };
  }

  private async getContent(input: CreateInput): Promise<HeroThreeContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateHeroThreeContent({
          purpose: input.purpose,
          mainLanguage: input.mainLanguage,
          description: input.description,
          audience: input.audience,
          userId: input.userId,
        });
      } else {
        throw new Error('Purpose and description must be provided.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate content for HeroلإThreeVariation.');
    }
  }
}
