import { ContentGeneratorHeroService } from 'src/features/content-generator/service/content-generator-hero.service';
import { HeroTwoContent } from 'src/features/content-generator/types';
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

export class HeroTwoVariation implements IComponentVariationFactory {
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
    return {
      title: { text: content.title, color: Color.primaryMain },
      description: { text: content.description, color: Color.textSecondary },
      button: {
        color: Color.commonWhite,
        backgroundColor: Color.primaryMain,
        text: contentButton[input.mainLanguage],
        linkTo: '',
      },
    };
  }

  private getDefaultData(language: LanguageTypeVariation): Output {
    const content = {
      [LanguageType.english]: {
        button: {
          backgroundColor: Color.primaryMain,
          color: Color.commonWhite,
          linkTo: '',
          text: 'Learn more',
        },
        description: {
          color: Color.textSecondary,
          text: 'Join User on a fun, simple journey through Different teachings and values.',
        },
        title: {
          color: Color.primaryMain,
          text: 'Different Learning Adventure',
        },
      },
      [LanguageType.arabic]: {
        button: {
          backgroundColor: Color.primaryMain,
          color: Color.commonWhite,
          linkTo: '',
          text: 'اعرف المزيد',
        },
        description: {
          color: 'common.white',
          text: 'انضم إلى المستخدم في رحلة ممتعة وبسيطة من خلال تعاليم وقيم مختلفة.',
        },
        title: {
          color: 'common.white',
          text: 'مغامرة تعليمية مختلفة',
        },
      },
    };
    return { ...content[language] };
  }

  private async getContent(input: CreateInput): Promise<HeroTwoContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateHeroTwoContent({
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
      throw new Error('Failed to generate content for HeroTwoVariation.');
    }
  }
}
