import { TextData } from 'src/features/components/types';
import { ContentGeneratorService } from 'src/features/content-generator/content-generator.service';
import { SliderContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  title: TextData;
  config: {
    titleTextColor: string;
    subtitleTextColor: string;
    descriptionTextColor: string;
    slides: {
      title: string;
      subtitle: string;
      description: string;
      image: string;
    }[];
  };
};
export class SliderOneVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
    private readonly storageService: StorageService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      titleTextColor: 'text.primary',
      subtitleTextColor: 'text.secondary',
      descriptionTextColor: 'text.secondary',
    };
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'Testimonials',
          color: 'text.primary',
        },
        config: {
          ...config,
          slides: [
            {
              title: 'Hannah Schmitt',
              subtitle: 'Lead Designer',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim ',
              image: 'https://picsum.photos/640/480?random=1',
            },
            {
              title: 'James Carter',
              subtitle: 'Senior Developer',
              description:
                'Sed tristique dolor ut libero sollicitudin, at vulputate augue bibendum. Nullam suscipit, lorem ut lacinia pharetra.',
              image: 'https://picsum.photos/640/480?random=2',
            },
            {
              title: 'Olivia Martinez',
              subtitle: 'Product Manager',
              description:
                'Mauris fringilla, justo vel pellentesque cursus, urna arcu tincidunt nisi, sit amet dapibus justo magna non justo.',
              image: 'https://picsum.photos/640/480?random=3',
            },
            {
              title: 'Liam Johnson',
              subtitle: 'UX Designer',
              description:
                'Suspendisse potenti. Integer facilisis justo vitae velit efficitur convallis. Nulla posuere sapien sed orci feugiat gravida.',
              image: 'https://picsum.photos/640/480?random=4',
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'عنوان',
          color: 'text.primary',
        },
        config: {
          ...config,
          slides: [
            {
              title: 'عنوان للكارد',
              subtitle: 'عنوان الفرعي',
              description: 'شرح مبسط هنا',
              image: 'https://picsum.photos/640/480?random=1',
            },
            {
              title: 'عنوان للكارد',
              subtitle: 'عنوان الفرعي',
              description: 'شرح مبسط هنا',
              image: 'https://picsum.photos/640/480?random=2',
            },
            {
              title: 'عنوان للكارد',
              subtitle: 'عنوان الفرعي',
              description: 'شرح مبسط هنا',
              image: 'https://picsum.photos/640/480?random=3',
            },
            {
              title: 'عنوان للكارد',
              subtitle: 'عنوان الفرعي',
              description: 'شرح مبسط هنا',
              image: 'https://picsum.photos/640/480?random=4',
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
      title: {
        text: contentAi.title,
        color: 'text.primary',
      },
      config: {
        ...config,
        slides: [
          {
            title: contentAi.title1,
            subtitle: contentAi.subtitle1,
            description: contentAi.description1,
            image: imageURL1,
          },
          {
            title: contentAi.title2,
            subtitle: contentAi.subtitle2,
            description: contentAi.description2,
            image: imageURL2,
          },
        ],
      },
    };
  }
  private async getContent(input: CreateInput): Promise<SliderContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateSliderContent({
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
      throw new Error('Failed to generate content for SliderContent.');
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
