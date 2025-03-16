import { ContentGeneratorHeroService } from 'src/features/content-generator/service/content-generator-hero.service';

import { HeroFiveContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import { ButtonData, ImageData, TextData } from '../../../types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  tagline: TextData;
  title: TextData;
  description: TextData;
  image: ImageData;
  button: ButtonData;
};

export class HeroFiveVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorHeroService,
    private readonly storageService: StorageService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    if (!input.generateAI) return this.getDefaultData(input.mainLanguage);

    // return content use AI
    const contentButton = {
      [LanguageType.english]: 'Learn more',
      [LanguageType.arabic]: 'اعرف المزيد',
    };
    const content = await this.getContent(input);
    const imageURL = await this.storeImage(input.userId, content.image);
    return {
      image: { alt: '', url: imageURL },
      tagline: { text: content.tagline, color: Color.commonWhite },
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
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'Learn more',
        },
        image: {
          alt: 'bg-image-hero-one',
          url: 'https://picsum.photos/640/480?random=1',
        },
        description: {
          color: Color.textSecondary,
          text: 'Join User on a fun, simple journey through Different teachings and values.',
        },
        tagline: {
          color: 'common.white',
          text: "User's",
        },
        title: {
          color: Color.primaryMain,
          text: 'Different Learning Adventure',
        },
      },
      [LanguageType.arabic]: {
        image: {
          alt: 'bg-image-hero-one',
          url: 'https://picsum.photos/640/480?random=1',
        },
        button: {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          linkTo: '',
          text: 'اعرف المزيد',
        },

        description: {
          color: Color.textSecondary,
          text: 'انضم إلى المستخدم في رحلة ممتعة وبسيطة من خلال تعاليم وقيم مختلفة.',
        },
        tagline: {
          color: 'common.white',
          text: 'المستخدمون',
        },
        title: {
          color: Color.primaryMain,
          text: 'مغامرة تعليمية مختلفة',
        },
      },
    };
    return { ...content[language] };
  }

  private async getContent(input: CreateInput): Promise<HeroFiveContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateHeroFiveContent({
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
      throw new Error('Failed to generate content for HeroFiveVariation.');
    }
  }

  private async storeImage(userId: string, imageURL: string) {
    try {
      const image = await this.storageService.storeImageFromURL(
        userId,
        imageURL,
      );
      return image.fileURL;
    } catch (err) {
      console.log(err);
      return imageURL;
    }
  }
}
