import { ImageData, TextData } from 'src/features/components/types';
import { ContentGeneratorAboutService } from 'src/features/content-generator/service/content-generator-about.service ';
import { AboutFiveContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  title: TextData;
  postTitle: TextData;
  image: ImageData;
  config: {
    textColor: string;
    items: { text: string }[];
  };
};

export class AboutFiveVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorAboutService,
    private readonly storageService: StorageService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    if (!input.generateAI) return this.getDefaultData(input.mainLanguage);
    // return content use AI
    const content = await this.getContent(input);
    const imageURL = await this.storeImage(input.userId, content.image);
    return {
      title: { text: content.title, color: Color.textSecondary },
      postTitle: { text: content.postTitle, color: Color.primaryMain },
      image: { alt: 'image', url: imageURL },
      config: {
        textColor: 'text.primary',
        items: [
          { text: content.itemtext1 },
          { text: content.itemtext2 },
          { text: content.itemtext3 },
        ],
      },
    };
  }
  private getDefaultData(language: LanguageTypeVariation): Output {
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'text',
          color: 'text.secondary',
        },
        postTitle: {
          text: 'postTitle',
          color: 'text.primary',
        },
        image: {
          alt: 'bg-image-ABOUT',
          url: 'https://miro.medium.com/v2/resize:fit:1400/1*opn1wt7cJxF3a4KnqHItVw.jpeg',
        },
        config: {
          textColor: 'text.primary',
          items: [
            {
              text: 'text ....',
            },
            {
              text: 'text ....',
            },
            {
              text: 'text ....',
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'نص رئيسي اول',
          color: 'text.secondary',
        },
        postTitle: {
          text: 'نص رئيسي ثاني',
          color: 'text.primary',
        },
        image: {
          alt: 'bg-image-about-six',
          url: 'https://miro.medium.com/v2/resize:fit:1400/1*opn1wt7cJxF3a4KnqHItVw.jpeg',
        },
        config: {
          textColor: 'text.primary',
          items: [
            {
              text: 'نص هنا',
            },
            {
              text: 'نص هنا',
            },
            {
              text: 'نص هنا',
            },
          ],
        },
      },
    };
    return { ...content[language] };
  }

  private async getContent(input: CreateInput): Promise<AboutFiveContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateFiveContent({
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
      throw new Error('Failed to generate content for generateFiveContent.');
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
