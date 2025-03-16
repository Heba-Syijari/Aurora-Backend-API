import { ContentGeneratorHeroService } from 'src/features/content-generator/service';
import { HeroNineContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import { ButtonData, ImageData, TextData } from '../../../types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type NewButtonData = ButtonData & { icon?: string };

type Output = {
  title: TextData;
  description: TextData;
  image: ImageData;
  buttons: NewButtonData[];
};

export class HeroNinetVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorHeroService,
    private readonly storageService: StorageService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    if (!input.generateAI) return this.getDefaultData(input.mainLanguage);
    // return content use AI
    const contentButton = {
      [LanguageType.english]: ['Start Free', 'Learn More'],
      [LanguageType.arabic]: ['ابدأ بالمجان', 'اعرف المزيد'],
    };
    const content = await this.getContent(input);
    const imageURL = await this.storeImage(input.userId, content.image);
    return {
      title: { text: content.title, color: Color.primaryMain },
      description: { text: content.description, color: Color.textSecondary },
      image: { alt: '', url: imageURL },
      buttons: [
        {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: contentButton[input.mainLanguage][0],
          icon: 'bxs:rocket',
        },
        {
          backgroundColor: 'common.white',
          color: 'secondary.main',
          linkTo: '',
          text: contentButton[input.mainLanguage][1],
        },
      ],
    };
  }
  private getDefaultData(language: LanguageTypeVariation): Output {
    const content = {
      [LanguageType.english]: {
        buttons: [
          {
            backgroundColor: 'primary.main',
            color: 'common.white',
            linkTo: '',
            text: 'Start Free',
            icon: 'bxs:rocket',
          },
          {
            backgroundColor: 'common.white',
            color: 'secondary.main',
            linkTo: '',
            text: 'Learn More',
          },
        ],
        image: {
          url: 'https://canvas-blocks.b-cdn.net/images/icon/2025-01/1738234707099.jpg',
          alt: 'hero-nine-image',
        },
        description: {
          color: 'text.secondary',
          text: 'Join User on a fun, simple journey through Different teachings and values.',
        },
        title: {
          color: 'text.primary',
          text: 'Simplify Workflows, Empower Integrations, Accelerate Innovation',
        },
      },
      [LanguageType.arabic]: {
        buttons: [
          {
            backgroundColor: 'primary.main',
            color: 'common.white',
            linkTo: '',
            text: 'ابدأ بالمجان',
            icon: 'bxs:rocket',
          },
          {
            backgroundColor: 'common.white',
            color: 'secondary.main',
            linkTo: '',
            text: 'اعرف المزيد',
          },
        ],
        image: {
          url: 'https://canvas-blocks.b-cdn.net/images/icon/2025-01/1738234707099.jpg',
          alt: 'hero-nine-image',
        },
        description: {
          color: 'text.secondary',
          text: 'انضم إلى المستخدم في رحلة ممتعة وبسيطة من خلال تعاليم وقيم مختلفة.',
        },
        title: {
          color: 'text.primary',
          text: 'انضم إلى المستخدم في رحلة ممتعة وبسيطة من خلال تعاليم وقيم مختلفة',
        },
      },
    };
    return { ...content[language] };
  }

  private async getContent(input: CreateInput): Promise<HeroNineContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateNineContent({
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
      throw new Error('Failed to generate content for HeroNineContent.');
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
