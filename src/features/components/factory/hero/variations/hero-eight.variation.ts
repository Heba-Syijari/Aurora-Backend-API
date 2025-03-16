import { ContentGeneratorHeroService } from 'src/features/content-generator/service';
import { HeroEightContent } from 'src/features/content-generator/types';
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

export class HeroEightVariation implements IComponentVariationFactory {
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
        color: Color.primaryMain,
        backgroundColor: Color.commonWhite,
        text: contentButton[input.mainLanguage],
        icon: 'solar:telescope-bold',
        linkTo: '',
      },
    };
  }
  private getDefaultData(language: LanguageTypeVariation): Output {
    const basics = {
      config: {
        descriptionTextColor: 'text.primary',
        titleTextColor: 'text.primary',
      },
      image: {
        alt: 'back-ground-hero-section',
        url: 'https://picsum.photos/640/480?random=1',
      },
    };
    const content = {
      [LanguageType.english]: {
        ...basics,
        title: {
          text: 'Different Learning Adventure',
          color: 'primary.main',
        },
        description: {
          text: 'Join User on a fun, simple journey through Different teachings and values.',
          color: 'text.secondary',
        },
        button: {
          backgroundColor: 'common.white',
          color: 'primary.main',
          linkTo: '',
          text: 'Learn More',
          icon: 'solar:telescope-bold',
        },
      },
      [LanguageType.arabic]: {
        ...basics,
        title: {
          text: 'مغامرة تعليمية مختلفة',
          color: 'primary.main',
        },
        description: {
          text: 'انضم إلى المستخدم في رحلة ممتعة وبسيطة من خلال تعاليم وقيم مختلفة.',
          color: 'text.secondary',
        },

        button: {
          backgroundColor: 'common.white',
          color: 'primary.main',
          linkTo: '',
          text: 'اعرف المزيد',
          icon: 'solar:telescope-bold',
        },
      },
    };
    return { ...content[language] };
  }
  private async getContent(input: CreateInput): Promise<HeroEightContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateEightContent({
          mainLanguage: input.mainLanguage,
          purpose: input.purpose,
          description: input.description,
          audience: input.audience,
          userId: input.userId,
        });
      } else {
        throw new Error('Purpose and description must be provided.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate content for HeroEightContent.');
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
