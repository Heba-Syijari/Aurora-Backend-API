import { ButtonData, ImageData, TextData } from 'src/features/components/types';
import { ContentGeneratorAboutService } from 'src/features/content-generator/service/content-generator-about.service ';
import { AboutTwoContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import { SocialsConfig } from '../../contact/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  button: ButtonData;
  image: ImageData;
  title: TextData;
  description: TextData;
  subtitle: TextData;
  socialsConfig: SocialsConfig;
};

export class AboutTwoVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorAboutService,
    private readonly storageService: StorageService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    if (!input.generateAI) return this.getDefaultData(input.mainLanguage);
    // return content use AI
    const content = await this.getContent(input);
    const buttonContent = {
      [LanguageType.english]: 'Learn more',
      [LanguageType.arabic]: 'اعرف المزيد',
    };
    const imageURL = await this.storeImage(input.userId, content.image);
    return {
      title: {
        color: Color.primaryMain,
        text: content.title,
      },
      subtitle: {
        color: Color.primaryMain,
        text: content.subtitle,
      },
      description: {
        color: Color.textSecondary,
        text: content.description,
      },
      image: {
        url: imageURL,
        alt: 'image',
      },
      socialsConfig: {
        socials: {
          facebook: 'https://facebook.com/#',
          instagram: 'https://instagram.com/#',
          linkedin: 'https://linkedin.com/in/#',
          twitter: 'https://twitter.com/#',
        },
        socialIconsColor: 'primary.main',
      },
      button: {
        backgroundColor: 'primary.main',
        color: 'common.white',
        linkTo: '',
        text: buttonContent[input.mainLanguage],
      },
    };
  }

  private getDefaultData(language: LanguageTypeVariation): Output {
    const content = {
      basics: {
        socialsConfig: {
          socials: {
            facebook: 'https://facebook.com/#',
            instagram: 'https://instagram.com/#',
            linkedin: 'https://linkedin.com/in/#',
            twitter: 'https://twitter.com/#',
          },
          socialIconsColor: 'primary.main',
        },
        image: {
          alt: 'image-about-two',
          url: 'https://miro.medium.com/v2/resize:fit:1400/1*opn1wt7cJxF3a4KnqHItVw.jpeg',
        },
      },
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
          color: 'text.primary',
          text: 'Different Learning Adventure',
        },
        subtitle: {
          color: 'text.primary',
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
          text: 'انضم الينا للحصول على الكثير من المرح ',
        },
        title: {
          color: 'text.primary',
          text: 'رحلة استكشافية رائعة',
        },
        subtitle: {
          color: 'text.primary',
          text: 'عنوان فرعي',
        },
      },
    };
    return { ...content[language], ...content['basics'] };
  }

  private async getContent(input: CreateInput): Promise<AboutTwoContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateAboutTwoContent({
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
      throw new Error('Failed to generate content for AboutTwoContent.');
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
