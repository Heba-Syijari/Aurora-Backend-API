import { ContentGeneratorHeroService } from 'src/features/content-generator/service/content-generator-hero.service';
import { HeroSixContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import { ButtonData, ImageData, TextData } from '../../../types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  config: {
    descriptionTextColor: string;
    titleTextColor: string;
  };
  title: TextData;
  description: TextData;
  image: ImageData;
  button: ButtonData & { icon: string };
};

export class HeroSixVariation implements IComponentVariationFactory {
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
      config: {
        descriptionTextColor: 'text.primary',
        titleTextColor: 'text.primary',
      },
      image: { alt: '', url: imageURL },
      title: { text: content.title, color: Color.primaryMain },
      description: { text: content.description, color: Color.textSecondary },
      button: {
        color: Color.commonWhite,
        backgroundColor: Color.primaryMain,
        linkTo: '',
        text: contentButton[input.mainLanguage],
        icon: 'mdi:car-clock',
      },
    };
  }
  private getDefaultData(language: LanguageTypeVariation): Output {
    const config = {
      descriptionTextColor: 'text.primary',
      titleTextColor: 'text.primary',
    };
    const content = {
      [LanguageType.english]: {
        config,
        title: {
          text: 'Different Learning Adventure',
          color: 'text.primary',
        },
        description: {
          text: 'Join User on a fun, simple journey through Different teachings and values.',
          color: 'text.secondary',
        },
        image: {
          alt: 'back-ground-hero-section',
          url: 'https://picsum.photos/640/480?random=1',
        },
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'Learn More',
          icon: 'mdi:car-clock',
        },
      },
      [LanguageType.arabic]: {
        config,
        title: {
          text: 'مغامرة تعليمية مختلفة',
          color: 'text.primary',
        },
        description: {
          text: 'انضم إلى المستخدم في رحلة ممتعة وبسيطة من خلال تعاليم وقيم مختلفة.',
          color: 'text.secondary',
        },
        image: {
          alt: 'back-ground-hero-section',
          url: 'https://picsum.photos/640/480?random=1',
        },
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'اعرف المزيد',
          icon: 'mdi:car-clock',
        },
      },
    };
    return { ...content[language] };
  }

  private async getContent(input: CreateInput): Promise<HeroSixContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateHeroSixContent({
          purpose: input.purpose,
          description: input.description,
          mainLanguage: input.mainLanguage,
          audience: input.audience,
          userId: input.userId,
        });
      } else {
        throw new Error('Purpose and description must be provided.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate content for HeroSixContent.');
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
