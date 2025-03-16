import { TextData } from 'src/features/components/types';
import { ContentGeneratorFeatureService } from 'src/features/content-generator/service/content-generator-feature.service ';
import { FeatureThreeContent } from 'src/features/content-generator/types';
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
  subTitle: TextData;
  title: TextData;
  config: Config;
};

export class FeatureThreeVariation implements IComponentVariationFactory {
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
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'title',
          color: 'text.primary',
        },
        subTitle: {
          text: 'subTitle',
          color: 'text.primary',
        },
        config: {
          ...config,
          features: [
            {
              title: 'car care',
              description:
                'Sample text. Click to select the text box.Click again or double click to startediting the text.',
              icon: 'mdi:car-clock',
              image:
                'https://media.istockphoto.com/id/1140524542/photo/were-laughing-a-new-website.jpg?s=612x612&w=0&k=20&c=bCnLYqg6VpBX0_Zz1OFlrjUQwEJzZjTg6ewzPzrL-j4=',
            },
            {
              title: 'car care',
              description:
                'Sample text. Click to select the text box.Click again or double click to startediting the text.',
              icon: 'mdi:car-clock',
              image:
                'https://its.umich.edu/sites/all/themes/bootstrap_its/images/hybrid-meetings-intro-photo.jpg',
            },
            {
              title: 'car care',
              description:
                'Sample text. Click to select the text box.Click again or double click to startediting the text.',
              icon: 'mdi:car-clock',
              image:
                'https://thumbs.dreamstime.com/b/businessman-using-tablet-laptop-analyzing-sales-data-economic-growth-graph-chart-business-strategy-digital-marketing-154742021.jpg',
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'عنوان',
          color: 'text.primary',
        },
        subTitle: {
          text: 'عنوان فرعي',
          color: 'text.primary',
        },
        config: {
          ...config,
          features: [
            {
              title: 'عنوان هنا',
              description: 'نص عينة. انقر لتحديد عنصر النص.',
              icon: 'ic:baseline-support-agent',
              image:
                'https://media.istockphoto.com/id/1140524542/photo/were-laughing-a-new-website.jpg?s=612x612&w=0&k=20&c=bCnLYqg6VpBX0_Zz1OFlrjUQwEJzZjTg6ewzPzrL-j4=',
            },
            {
              title: 'عنوان هنا',
              description: 'نص عينة. انقر لتحديد عنصر النص.',
              icon: 'ic:baseline-support-agent',
              image:
                'https://its.umich.edu/sites/all/themes/bootstrap_its/images/hybrid-meetings-intro-photo.jpg',
            },
            {
              title: 'عنوان هنا',
              description: 'نص عينة. انقر لتحديد عنصر النص.',
              icon: 'ic:baseline-support-agent',
              image:
                'https://thumbs.dreamstime.com/b/businessman-using-tablet-laptop-analyzing-sales-data-economic-growth-graph-chart-business-strategy-digital-marketing-154742021.jpg',
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
    const imageURL3 = await this.storeImage(input.userId, contentAi.image3);

    return {
      title: { text: contentAi.title, color: Color.textPrimary },
      subTitle: { text: contentAi.subTitle, color: Color.textPrimary },
      config: {
        ...config,
        features: [
          {
            title: contentAi.title1,
            description: contentAi.description1,
            icon: icons[Math.floor(Math.random() * 49)].value,
            image: imageURL1,
          },
          {
            title: contentAi.title2,
            description: contentAi.description2,
            icon: icons[Math.floor(Math.random() * 49)].value,
            image: imageURL2,
          },
          {
            title: contentAi.title3,
            description: contentAi.description3,
            icon: icons[Math.floor(Math.random() * 49)].value,
            image: imageURL3,
          },
        ],
      },
    };
  }

  private async getContent(input: CreateInput): Promise<FeatureThreeContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateThreeContent({
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
      throw new Error('Failed to generate content for FeatureThreeContent.');
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
