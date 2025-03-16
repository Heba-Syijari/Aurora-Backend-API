import { TextData } from 'src/features/components/types';
import { ContentGeneratorFeatureService } from 'src/features/content-generator/service/content-generator-feature.service ';
import { FeatureSevenContent } from 'src/features/content-generator/types';
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
  config: {
    lightTextColor: string;
    darkTextColor: string;
    lightBackgroundColor: string;
    darkbackgroundColor: string;
    features: Config['features'];
  };
};

export class FeatureSevenVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorFeatureService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      lightTextColor: 'common.white',
      darkTextColor: 'text.primary',
      lightBackgroundColor: 'common.white',
      darkbackgroundColor: 'primary.main',
    };
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'title',
          color: 'text.primary',
        },
        config: {
          ...config,
          features: [
            {
              title: 'EXPERTISE',
              description:
                'Duis aute irure dolor inreprehenderit in voluptatevelit esse cillum dolore eufugiat nulla pariatur',
              icon: 'material-symbols-light:diamond-outline-rounded',
            },
            {
              title: 'EXPERTISE',
              description:
                'Duis aute irure dolor inreprehenderit in voluptatevelit esse cillum dolore eufugiat nulla pariatur',
              icon: 'material-symbols-light:diamond-outline-rounded',
            },
            {
              title: 'EXPERTISE',
              description:
                'Duis aute irure dolor inreprehenderit in voluptatevelit esse cillum dolore eufugiat nulla pariatur',
              icon: 'material-symbols-light:diamond-outline-rounded',
            },
            {
              title: 'EXPERTISE',
              description:
                'Duis aute irure dolor inreprehenderit in voluptatevelit esse cillum dolore eufugiat nulla pariatur',
              icon: 'material-symbols-light:diamond-outline-rounded',
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
    return {
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
            title: contentAi.title4,
            description: contentAi.description4,
            icon: icons[Math.floor(Math.random() * 49)].value,
          },
        ],
      },
    };
  }
  private async getContent(input: CreateInput): Promise<FeatureSevenContent> {
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
      throw new Error('Failed to generate content for FeatureSevenContent.');
    }
  }
}
