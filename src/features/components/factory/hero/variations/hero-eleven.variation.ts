import { ContentGeneratorHeroService } from 'src/features/content-generator/service/content-generator-hero.service';
import { HeroElevenContent } from 'src/features/content-generator/types';
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
  backgroundImage: ImageData;
  image: ImageData;
};

export class HeroeElvenariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorHeroService,
    private readonly storageService: StorageService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    if (!input.generateAI) return this.getDefaultData(input.mainLanguage);
    // return content use AI
    const content = await this.getContent(input);
    const imageURL = await this.storeImage(input.userId, content.image);
    const backgroundImageURL = await this.storeImage(
      input.userId,
      content.backgroundImage,
    );
    return {
      backgroundImage: { alt: 'backgroundImage', url: backgroundImageURL },
      image: { alt: 'image', url: imageURL },
      title: { text: content.title, color: Color.primaryMain },
    };
  }
  private getDefaultData(language: LanguageTypeVariation): Output {
    const content = {
      [LanguageType.english]: {
        image: {
          alt: 'bg-image-hero-one',
          url: 'https://picsum.photos/640/480?random=1',
        },
        backgroundImage: {
          alt: 'bg-image-hero-one',
          url: 'https://picsum.photos/640/480?random=2',
        },
        title: {
          color: 'text.primary',
          text: 'Some Header Text is Here',
        },
      },
      [LanguageType.arabic]: {
        image: {
          alt: 'bg-image-hero-one',
          url: 'https://picsum.photos/640/480?random=1',
        },
        backgroundImage: {
          alt: 'bg-image-hero-one',
          url: 'https://picsum.photos/640/480?random=2',
        },
        title: {
          color: 'text.primary',
          text: 'مغامرة تعليمية مختلفة',
        },
      },
    };
    return { ...content[language] };
  }

  private async getContent(input: CreateInput): Promise<HeroElevenContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateElevenContent({
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
      throw new Error('Failed to generate content for HeroElevenContent.');
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
