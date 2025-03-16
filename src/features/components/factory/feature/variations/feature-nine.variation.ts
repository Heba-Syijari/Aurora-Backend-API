import { TextData } from 'src/features/components/types';
import { ContentGeneratorFeatureService } from 'src/features/content-generator/service/content-generator-feature.service ';
import { FeatureNineContent } from 'src/features/content-generator/types';
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
    lightColor: string;
    darkColor: string;
    features: Config['features'];
  };
};

export class FeatureNineVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorFeatureService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    const config = { lightColor: 'common.white', darkColor: 'primary.main' };
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
              title: 'WORKFORCE',
              description:
                'Sample text. Click to select the textbox. Click again or double click tostart editing the text. Excepteur sintoccaecat cupidatat non proident.',
              icon: 'tabler:coins',
            },
            {
              title: 'WORKFORCE',
              description:
                'Sample text. Click to select the textbox. Click again or double click tostart editing the text. Excepteur sintoccaecat cupidatat non proident.',
              icon: 'tabler:coins',
            },
            {
              title: 'WORKFORCE',
              description:
                'Sample text. Click to select the textbox. Click again or double click tostart editing the text. Excepteur sintoccaecat cupidatat non proident.',
              icon: 'tabler:coins',
            },
            {
              title: 'WORKFORCE',
              description:
                'Sample text. Click to select the textbox. Click again or double click tostart editing the text. Excepteur sintoccaecat cupidatat non proident.',
              icon: 'tabler:coins',
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
  private async getContent(input: CreateInput): Promise<FeatureNineContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateNineContent({
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
      throw new Error('Failed to generate content for FeatureNineContent.');
    }
  }
}
