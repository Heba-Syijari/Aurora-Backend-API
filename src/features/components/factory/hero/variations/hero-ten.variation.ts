import { ContentGeneratorHeroService } from 'src/features/content-generator/service/content-generator-hero.service';
import { HeroTenContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import { ImageData, TextData } from '../../../types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
type Output = {
  title: TextData;
  tagline: TextData;
  image: ImageData;
};

export class HeroTenVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorHeroService,
    private readonly storageService: StorageService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    if (!input.generateAI) return this.getDefaultData(input.mainLanguage);

    // return content use AI
    const content = await this.getContent(input);
    const imageURL = await this.storeImage(input.userId, content.image);
    return {
      image: { alt: '', url: imageURL },
      tagline: { text: content.tagline, color: Color.primaryMain },
      title: { text: content.title, color: Color.primaryMain },
    };
  }
  private getDefaultData(language: LanguageTypeVariation): Output {
    const content = {
      [LanguageType.english]: {
        image: {
          alt: 'bg-image-hero-one',
          url: 'https://canvas-blocks.b-cdn.net/images/icon/2025-01/1738234707099.jpg',
        },
        title: {
          color: 'text.primary',
          text: 'Some Header Text is Here',
        },
        tagline: {
          color: 'text.primary',
          text: 'tagline',
        },
      },
      [LanguageType.arabic]: {
        image: {
          alt: 'bg-image-hero-one',
          url: 'https://canvas-blocks.b-cdn.net/images/icon/2025-01/1738234707099.jpg',
        },
        title: {
          color: 'text.primary',
          text: 'مغامرة تعليمية مختلفة',
        },
        tagline: {
          color: 'text.primary',
          text: 'نص هنا',
        },
      },
    };
    return { ...content[language] };
  }
  private async getContent(input: CreateInput): Promise<HeroTenContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateTenContent({
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
      throw new Error('Failed to generate content for HeroTenContent.');
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
