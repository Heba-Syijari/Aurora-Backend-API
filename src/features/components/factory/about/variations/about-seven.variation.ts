import { ImageData, TextData } from 'src/features/components/types';
import { ContentGeneratorAboutService } from 'src/features/content-generator/service/content-generator-about.service ';
import { AboutSevenContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  description: TextData;
  config: {
    textColor: string;
    items: { text: string }[];
  };
  image: ImageData;
};

export class AboutSevenVariation implements IComponentVariationFactory {
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
      description: { text: content.description, color: Color.textPrimary },
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
        description: {
          text: `This is a Text and can be edited`,
          color: 'text.primary',
        },
        image: {
          alt: 'image',
          url: 'https://miro.medium.com/v2/resize:fit:1400/1*opn1wt7cJxF3a4KnqHItVw.jpeg',
        },
        config: {
          textColor: 'primary.main',
          items: [
            { text: 'text here ' },
            { text: 'text here ' },
            { text: 'text here ' },
          ],
        },
      },
      [LanguageType.arabic]: {
        description: {
          text: `هنا يوجد نص قابل للتعديل`,
          color: 'text.primary',
        },
        image: {
          alt: 'image',
          url: 'https://miro.medium.com/v2/resize:fit:1400/1*opn1wt7cJxF3a4KnqHItVw.jpeg',
        },
        config: {
          textColor: 'primary.main',
          items: [
            { text: 'حل 1' },
            { text: 'حل 2' },
            { text: 'حل 3' },
            { text: 'حل 4' },
          ],
        },
      },
    };
    return { ...content[language] };
  }
  private async getContent(input: CreateInput): Promise<AboutSevenContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateSevenContent({
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
      throw new Error('Failed to generate content for generateSevenContent.');
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
