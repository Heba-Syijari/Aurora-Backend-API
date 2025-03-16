import { ContentGeneratorHeroService } from 'src/features/content-generator/service/content-generator-hero.service';

import { HeroFourContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import { ButtonData, ImageData, TextData } from '../../../types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  title: TextData;
  description: TextData;
  image: ImageData;
  button: ButtonData;
};

export class HeroFourVariation implements IComponentVariationFactory {
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
        image: {
          alt: 'bg-image-hero-one',
          url: 'https://picsum.photos/640/480?random=1',
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

  private async getContent(input: CreateInput): Promise<HeroFourContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateHeroFourContent({
          purpose: input.purpose,
          description: input.description,
          audience: input.audience,
          mainLanguage: input.mainLanguage,
          userId: input.userId,
        });
      } else {
        throw new Error('Purpose and description must be provided.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate content for HeroFourVariation.');
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
