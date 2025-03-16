import { ContentGeneratorHeroService } from 'src/features/content-generator/service';
import { HeroSevenContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType, LanguageTypeVariation } from 'src/types';
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
  tagline: TextData;
  description: TextData;
  images: ImageData[];
  backGroundImage: ImageData;
  mainImage: ImageData;
  button: ButtonData & { icon: string };
};

export class HeroSevenVariation implements IComponentVariationFactory {
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
    const mainImageURL = await this.storeImage(input.userId, content.mainImage);
    const backGroundImageURL = await this.storeImage(
      input.userId,
      content.backGroundImage,
    );
    return {
      config: {
        descriptionTextColor: 'text.primary',
        titleTextColor: 'text.primary',
      },
      mainImage: { alt: '', url: mainImageURL },
      backGroundImage: { alt: '', url: backGroundImageURL },
      title: { text: content.title, color: 'primary.main' },
      tagline: { text: content.tagline, color: 'primary.main' },
      description: { text: content.description, color: 'text.secondary' },
      images: [
        {
          alt: 'image1',
          url: 'https://picsum.photos/640/480?random=1',
        },
        {
          alt: 'image1',
          url: 'https://picsum.photos/640/480?random=2',
        },
        {
          alt: 'image1',
          url: 'https://picsum.photos/100/100?random=3',
        },
        {
          alt: 'image1',
          url: 'https://picsum.photos/100/100?random=4',
        },
        {
          alt: 'image1',
          url: 'https://picsum.photos/100/100?random=5',
        },
        {
          alt: 'image1',
          url: 'https://picsum.photos/100/100?random=6',
        },
      ],
      button: {
        backgroundColor: 'primary.main',
        color: 'common.white',
        linkTo: '',
        text: contentButton[input.mainLanguage],
        icon: 'mdi:car-clock',
      },
    };
  }
  private getDefaultData(language: LanguageTypeVariation): Output {
    const basics = {
      config: {
        descriptionTextColor: 'text.primary',
        titleTextColor: 'text.primary',
      },
      images: [
        {
          alt: 'image1',
          url: 'https://picsum.photos/640/480?random=1',
        },
        {
          alt: 'image1',
          url: 'https://picsum.photos/640/480?random=2',
        },
        {
          alt: 'image1',
          url: 'https://picsum.photos/100/100?random=3',
        },
        {
          alt: 'image1',
          url: 'https://picsum.photos/100/100?random=4',
        },
        {
          alt: 'image1',
          url: 'https://picsum.photos/100/100?random=5',
        },
        {
          alt: 'image1',
          url: 'https://picsum.photos/100/100?random=6',
        },
      ],
      backGroundImage: {
        alt: 'back-ground-hero-section',
        url: 'https://picsum.photos/640/480?random=7',
      },
      mainImage: {
        alt: 'back-ground-hero-section',
        url: 'https://picsum.photos/640/480?random=8',
      },
    };
    const content = {
      [LanguageType.english]: {
        ...basics,
        title: {
          text: 'Redefining Arabic A1... Is Coming Soon!',
          color: 'primary.main',
        },
        tagline: {
          text: 'Redefining Arabic A1... Is Coming Soon!',
          color: 'primary.main',
        },
        description: {
          text: 'Learn about how we handle your data and ensure your copy wite is protected. Below are common questions and answers regarding our copy wite practices.',
          color: 'text.secondary',
        },
        button: {
          backgroundColor: 'common.white',
          color: 'primary.main',
          linkTo: '',
          text: 'Explore Our Solutions',
          icon: 'solar:telescope-bold',
        },
      },
      [LanguageType.arabic]: {
        ...basics,
        title: {
          text: 'إعادة تعريف العربية أ 1... قريبا!',
          color: 'primary.main',
        },
        tagline: {
          text: 'إعادة تعريف العربية أ 1... قريبا!',
          color: 'primary.main',
        },
        description: {
          text: 'تعرف على كيفية تعاملنا مع بياناتك والتأكد من حماية مؤلف الإعلانات الخاص بك. فيما يلي أسئلة وأجوبة شائعة بخصوص ممارسات النسخ الخاصة بنا.',
          color: 'text.secondary',
        },
        button: {
          backgroundColor: 'common.white',
          color: 'primary.main',
          linkTo: '',
          text: 'اكتشف اكثر',
          icon: 'solar:telescope-bold',
        },
      },
    };
    return { ...content[language] };
  }

  private async getContent(input: CreateInput): Promise<HeroSevenContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateHeroSevenContent({
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
      throw new Error('Failed to generate content for HeroSevenContent.');
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
