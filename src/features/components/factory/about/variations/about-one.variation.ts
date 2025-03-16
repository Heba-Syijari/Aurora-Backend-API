import { ButtonData, TextData } from 'src/features/components/types';
import { ContentGeneratorAboutService } from 'src/features/content-generator/service/content-generator-about.service ';

import { AboutOneContent } from 'src/features/content-generator/types';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  button: ButtonData;
  title: TextData;
  description: TextData;
  subtitle: TextData;
};

export class AboutOneVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorAboutService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    if (!input.generateAI) return this.getDefaultData(input.mainLanguage);
    // return content use AI
    const content = await this.getContent(input);
    const buttonContent = {
      [LanguageType.english]: 'Learn more',
      [LanguageType.arabic]: 'اعرف المزيد',
    };
    return {
      title: {
        color: Color.primaryMain,
        text: content.title,
      },
      subtitle: {
        color: Color.primaryMain,
        text: content.title,
      },
      description: {
        color: Color.textSecondary,
        text: content.description,
      },
      button: {
        color: Color.primaryContrastText,
        backgroundColor: Color.primaryMain,
        text: buttonContent[input.mainLanguage],
        linkTo: '',
      },
    };
  }
  private getDefaultData(language: LanguageTypeVariation): Output {
    const content = {
      [LanguageType.english]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
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
        subtitle: {
          color: Color.primaryMain,
          text: 'subtitle',
        },
      },
      [LanguageType.arabic]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'اعرف المزيد',
        },
        description: {
          color: Color.textSecondary,
          text: 'انضم الينا لمغامرة مليئة بالسعادة',
        },
        title: {
          color: Color.primaryMain,
          text: 'رحلة تعلم ليس لها مثيل',
        },
        subtitle: {
          color: Color.primaryMain,
          text: 'عنوان فرعي',
        },
      },
    };
    return { ...content[language] };
  }

  private async getContent(input: CreateInput): Promise<AboutOneContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateAboutOneContent({
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
      throw new Error('Failed to generate content for AboutOneContent.');
    }
  }
}
