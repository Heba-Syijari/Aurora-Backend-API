import { ImageData, TextData } from 'src/features/components/types';
import { ContentGeneratorAboutService } from 'src/features/content-generator/service';
import { AboutFourContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  title: TextData;
  cardOneTitle: TextData;
  cardTwoTitle: TextData;
  cardOneDescription: TextData;
  cardTwoDescription: TextData;
  subtitle: TextData;
  description: TextData;
  cardOneImage: ImageData;
  cardTwoImage: ImageData;
  image: ImageData;
};

export class AboutFourVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorAboutService,
    private readonly storageService: StorageService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    if (!input.generateAI) return this.getDefaultData(input.mainLanguage);
    // return content use AI
    const content = await this.getContent(input);
    const imageURL = await this.storeImage(input.userId, content.image);
    const cardOneImageURL = await this.storeImage(
      input.userId,
      content.cardOneImage,
    );
    const cardTwoImageURL = await this.storeImage(
      input.userId,
      content.cardTwoImage,
    );
    return {
      title: { text: content.title, color: Color.primaryMain },
      subtitle: { text: content.subtitle, color: Color.textPrimary },
      description: { text: content.description, color: Color.textSecondary },
      image: { alt: 'image', url: imageURL },
      cardOneDescription: {
        text: content.cardOneDescription,
        color: Color.textSecondary,
      },
      cardOneTitle: {
        text: content.cardOneTitle,
        color: Color.textPrimary,
      },
      cardOneImage: { alt: 'cardOneImage', url: cardOneImageURL },
      cardTwoDescription: {
        text: content.cardTwoDescription,
        color: Color.textSecondary,
      },
      cardTwoTitle: {
        text: content.cardTwoTitle,
        color: Color.textPrimary,
      },
      cardTwoImage: { alt: 'cardOneImage', url: cardTwoImageURL },
    };
  }
  private getDefaultData(language: LanguageTypeVariation): Output {
    const content = {
      [LanguageType.english]: {
        title: {
          color: Color.primaryMain,
          text: `Header Title is Here !.`,
        },
        cardOneTitle: {
          color: 'text.primary',
          text: `card One Title`,
        },
        cardTwoTitle: {
          color: 'text.primary',
          text: `card Two Title`,
        },
        subtitle: {
          color: 'text.primary',
          text: 'Some Text is Here !.',
        },
        description: {
          color: Color.textSecondary,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper posuere sapien, eu efficitur leo. In fringilla sem quis auctor cursus.',
        },
        cardOneDescription: {
          color: Color.textSecondary,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper posuere sapien, eu efficitur leo. In fringilla sem quis auctor cursus.',
        },
        cardTwoDescription: {
          color: Color.textSecondary,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper posuere sapien, eu efficitur leo. In fringilla sem quis auctor cursus.',
        },
        cardOneImage: {
          alt: 'bg-image-hero-one',
          url: 'https://picsum.photos/512/512?random=1',
        },
        cardTwoImage: {
          alt: 'bg-image-hero-one',
          url: 'https://picsum.photos/512/512?random=2',
        },
        image: {
          alt: 'bg-image-about-six',
          url: 'https://miro.medium.com/v2/resize:fit:1400/1*opn1wt7cJxF3a4KnqHItVw.jpeg',
        },
      },
      [LanguageType.arabic]: {
        title: {
          color: Color.primaryMain,
          text: 'حولنا',
        },
        subtitle: {
          color: 'text.primary',
          text: 'بدأنا منذ عام 2022',
        },
        description: {
          color: 'text.primary',
          text: `إرث عقد من الزمان على أساس هو النظام البيئي كوون نحن .التميز التكنولوجي للذكاء الاصطناعي مسراج  إف-عربي متقدم من خلال الذكاء الاصطناعي للمستقبل إعادة تشكيل الاحتياجات المحددة للتموين والحلول ماجستير في إدارة الأعمال الشركات الأولى العربية`,
        },
        cardOneImage: {
          alt: 'bg-image-hero-one',
          url: 'https://picsum.photos/512/512?random=1',
        },
        cardTwoImage: {
          alt: 'bg-image-hero-one',
          url: 'https://picsum.photos/512/512?random=2',
        },
        cardOneTitle: {
          color: 'text.primary',
          text: 'عنوان للكارد الاول',
        },
        cardTwoTitle: {
          color: 'text.primary',
          text: 'عنوان للكارد الثاني',
        },
        cardOneDescription: {
          color: 'text.primary',
          text: 'شرح للكارد الاول',
        },
        cardTwoDescription: {
          color: 'text.primary',
          text: 'شرح للكارد الثاني',
        },
        image: {
          alt: 'bg-image-hero-one',
          url: 'https://picsum.photos/512/512?random=3',
        },
      },
    };
    return { ...content[language] };
  }
  private async getContent(input: CreateInput): Promise<AboutFourContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateFourContent({
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
      throw new Error('Failed to generate content for AboutFourContent.');
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
