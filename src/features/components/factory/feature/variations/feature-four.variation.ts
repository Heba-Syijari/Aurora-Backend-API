import { ImageData, TextData } from 'src/features/components/types';
import { ContentGeneratorFeatureService } from 'src/features/content-generator/service/content-generator-feature.service ';
import { FeatureFourContent } from 'src/features/content-generator/types';
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
  images: ImageData[];
  title: TextData;
  config: Config;
};

export class FeatureFourVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorFeatureService,
    private readonly storageService: StorageService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      titleTextColor: 'text.primary',
      descriptionTextColor: 'text.primary',
      iconColor: 'primary.main',
    };
    const images = [
      {
        alt: 'feature-ten-bg-image',
        url: 'https://thumbs.dreamstime.com/b/businessman-using-tablet-laptop-analyzing-sales-data-economic-growth-graph-chart-business-strategy-digital-marketing-154742021.jpg',
      },
      {
        alt: 'feature-ten-bg-image',
        url: 'https://media.istockphoto.com/id/1140524542/photo/were-laughing-a-new-website.jpg?s=612x612&w=0&k=20&c=bCnLYqg6VpBX0_Zz1OFlrjUQwEJzZjTg6ewzPzrL-j4=',
      },
    ];
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'title',
          color: 'text.primary',
        },
        images,
        config: {
          ...config,
          features: [
            {
              title: 'sample headline',
              description:
                'Sample text. Sample text.Click to select the text box.',
              icon: 'ic:baseline-settings',
            },
            {
              title: 'sample headline',
              description:
                'Sample text. Sample text.Click to select the text box.',
              icon: 'ic:baseline-settings',
            },
            {
              title: 'sample headline',
              description:
                'Sample text. Sample text.Click to select the text box.',
              icon: 'ic:baseline-settings',
            },
            {
              title: 'sample headline',
              description:
                'Sample text. Sample text.Click to select the text box.',
              icon: 'ic:baseline-settings',
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'عنوان',
          color: 'text.primary',
        },
        images,
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
    const imageURL1 = await this.storeImage(input.userId, contentAi.image1);
    const imageURL2 = await this.storeImage(input.userId, contentAi.image2);

    return {
      images: [
        {
          alt: 'feature-ten-bg-image',
          url: imageURL1,
        },
        {
          alt: 'feature-ten-bg-image',
          url: imageURL2,
        },
      ],
      title: { text: contentAi.title, color: Color.textPrimary },
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
            title: contentAi.description4,
            description: contentAi.description4,
            icon: icons[Math.floor(Math.random() * 49)].value,
          },
        ],
      },
    };
  }
  private async getContent(input: CreateInput): Promise<FeatureFourContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateFourContent({
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
      throw new Error('Failed to generate content for FeatureFourContent.');
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
