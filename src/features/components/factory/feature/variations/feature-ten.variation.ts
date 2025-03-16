import { ImageData, TextData } from 'src/features/components/types';
import { ContentGeneratorFeatureService } from 'src/features/content-generator/service/content-generator-feature.service ';
import { FeatureTenContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType } from 'src/types';
import { Color } from 'src/utils/color';
import { icons } from 'src/utils/icon';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { Config } from '../types';

type Output = {
  title: TextData;
  image: ImageData;
  config: {
    lightTextColor: string;
    darkTextColor: string;
    lightBackgroundColor: string;
    darkbackgroundColor: string;
    features: Config['features'];
  };
};

export class FeatureTenVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorFeatureService,
    private readonly storageService: StorageService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      lightTextColor: 'common.white',
      darkTextColor: 'text.primary',
      lightBackgroundColor: 'common.white',
      darkbackgroundColor: 'primary.main',
    };
    const image = {
      alt: 'feature-ten-bg-image',
      url: 'https://s3.amazonaws.com/utep-uploads/wp-content/uploads/UAB/2022/07/18193751/Image-2_v1-17-1.jpg',
    };
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'title',
          color: 'text.primary',
        },
        image,
        config: {
          ...config,
          features: [
            {
              title: 'PLANNING',
              description:
                'Sample text. Click to select the textbox. Click again or double click tostart editing the text.',
              icon: 'mdi:ring',
            },
            {
              title: 'PLANNING',
              description:
                'Sample text. Click to select the textbox. Click again or double click tostart editing the text.',
              icon: 'mdi:ring',
            },
            {
              title: 'PLANNING',
              description:
                'Sample text. Click to select the textbox. Click again or double click tostart editing the text.',
              icon: 'mdi:ring',
            },
            {
              title: 'PLANNING',
              description:
                'Sample text. Click to select the textbox. Click again or double click tostart editing the text.',
              icon: 'mdi:ring',
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'عنوان',
          color: 'text.primary',
        },
        image,
        config: {
          ...config,
          features: [
            {
              title: 'عنوان هنا',
              description: 'نص عينة. انقر لتحديد عنصر النص.',
              icon: 'ic:baseline-support-agent',
            },
            {
              title: 'عنوان هنا',
              description: 'نص عينة. انقر لتحديد عنصر النص.',
              icon: 'ic:baseline-support-agent',
            },
            {
              title: 'عنوان هنا',
              description: 'نص عينة. انقر لتحديد عنصر النص.',
              icon: 'ic:baseline-support-agent',
            },
            {
              title: 'عنوان هنا',
              description: 'نص عينة. انقر لتحديد عنصر النص.',
              icon: 'ic:baseline-support-agent',
            },
          ],
        },
      },
    };
    if (!input.generateAI) return { ...content[input.mainLanguage] };

    // return content use AI
    const contentAi = await this.getContent(input);
    const imageURL = await this.storeImage(input.userId, contentAi.image);
    return {
      title: { text: contentAi.title, color: Color.textPrimary },
      image: {
        alt: 'feature-ten-bg-image',
        url: imageURL,
      },
      config: {
        ...config,
        features: [
          {
            title: contentAi.title1,
            description: contentAi.description1,
            icon: icons[Math.floor(Math.random() * 49)].value,
          },
          {
            title: contentAi.title2,
            description: contentAi.description2,
            icon: icons[Math.floor(Math.random() * 49)].value,
          },
          {
            title: contentAi.title3,
            description: contentAi.description3,
            icon: icons[Math.floor(Math.random() * 49)].value,
          },
          {
            title: contentAi.title4,
            description: contentAi.description4,
            icon: icons[Math.floor(Math.random() * 49)].value,
          },
        ],
      },
    };
  }
  private async getContent(input: CreateInput): Promise<FeatureTenContent> {
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
      throw new Error('Failed to generate content for FeatureTenContent.');
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
