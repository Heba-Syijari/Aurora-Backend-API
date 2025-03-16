import { ButtonData, ImageData, TextData } from 'src/features/components/types';
import { ContentGeneratorAboutService } from 'src/features/content-generator/service/content-generator-about.service ';

import { AboutThreeContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  button: ButtonData;
  image: ImageData;
  title: TextData;
  description: TextData;
};

export class AboutThreeVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorAboutService,
    private readonly storageService: StorageService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    if (!input.generateAI) return this.getDefaultData(input.mainLanguage);
    // return content use AI
    const content = await this.getContent(input);
    const imageURL = await this.storeImage(input.userId, content.image);
    const buttonContent = {
      [LanguageType.english]: 'Learn more',
      [LanguageType.arabic]: 'اعرف المزيد',
    };
    return {
      title: { text: content.title, color: Color.textPrimary },
      description: { text: content.description, color: Color.textSecondary },
      image: { alt: '', url: imageURL },
      button: {
        text: buttonContent[input.mainLanguage],
        color: Color.commonWhite,
        backgroundColor: Color.primaryMain,
        linkTo: '',
      },
    };
  }

  private async getContent(input: CreateInput): Promise<AboutThreeContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateAboutThreeContent({
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
      throw new Error('Failed to generate content for AboutThreeContent.');
    }
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
          color: 'text.secondary',
          text: 'Join User on a fun, simple journey through Different teachings and values.',
        },
        image: {
          alt: 'bg-image-hero-one',
          url: 'https://static.vecteezy.com/system/resources/previews/006/304/593/non_2x/abstract-white-and-light-grey-geometric-square-overlapped-pattern-on-background-with-shadow-modern-silver-color-cube-shape-with-copy-space-simple-and-minimal-banner-design-eps10-vector.jpg',
        },
        title: {
          color: 'text.primary',
          text: 'Different Learning Adventure',
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
          color: 'text.secondary',
          text: 'انضم الينا للحصول على الكثير من المرح ',
        },
        image: {
          alt: 'bg-image-hero-one',
          url: 'https://static.vecteezy.com/system/resources/previews/006/304/593/non_2x/abstract-white-and-light-grey-geometric-square-overlapped-pattern-on-background-with-shadow-modern-silver-color-cube-shape-with-copy-space-simple-and-minimal-banner-design-eps10-vector.jpg',
        },
        title: {
          color: 'text.primary',
          text: 'رحلة استكشافية رائعة',
        },
      },
    };
    return { ...content[language] };
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
