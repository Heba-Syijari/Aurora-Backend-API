import { ButtonData, TextData } from 'src/features/components/types';
import { ContentGeneratorFeatureService } from 'src/features/content-generator/service/content-generator-feature.service ';
import { FeatureTwoContent } from 'src/features/content-generator/types';
import { LanguageType } from 'src/types';
import { Color } from 'src/utils/color';
import { icons } from 'src/utils/icon';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { Config } from '../types';

type Output = {
  button: ButtonData;
  servicesTitle: TextData;
  title: TextData;
  servicesCongig: {
    servicesColor: string;
    services: string[];
  };
  config: Config;
};

export class FeatureTwoVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorFeatureService,
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
        servicesTitle: {
          text: 'services title',
          color: 'text.primary',
        },
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'learn more',
        },
        servicesCongig: {
          servicesColor: 'text.primary',
          services: [
            'Interior Architecture',
            'Interior Design and Decoration',
            'Finish and Fixture Specifications',
            'Elevations and Construction Drawings',
            '3D Models and Photorealistic Visualisations',
          ],
        },
        config: {
          ...config,
          features: [
            {
              title: 'furniture design',
              description:
                'Sample text. Click to selectthe text box. Click again ordouble click to start editingthe text.',
              icon: 'mdi:ceiling-lamp-multiple-outline',
            },
            {
              title: 'furniture design',
              description:
                'Sample text. Click to selectthe text box. Click again ordouble click to start editingthe text.',
              icon: 'mdi:ceiling-lamp-multiple-outline',
            },
            {
              title: 'furniture design',
              description:
                'Sample text. Click to selectthe text box. Click again ordouble click to start editingthe text.',
              icon: 'mdi:ceiling-lamp-multiple-outline',
            },
            {
              title: 'furniture design',
              description:
                'Sample text. Click to selectthe text box. Click again ordouble click to start editingthe text.',
              icon: 'mdi:ceiling-lamp-multiple-outline',
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'عنوان هنا',
          color: 'text.primary',
        },
        servicesTitle: {
          text: 'عنوان هنا',
          color: 'text.primary',
        },
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'تعرف على المزيد',
        },
        servicesCongig: {
          servicesColor: 'text.primary',
          services: [
            'الهندسة المعمارية الداخلية',
            'التصميم الداخلي والديكور',
            'مواصفات التشطيبات والتجهيزات',
            'الواجهات والرسومات الإنشائية',
            'النماذج ثلاثية الأبعاد والتصورات الواقعية',
          ],
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
      button: content[input.mainLanguage].button,
      servicesTitle: {
        text: contentAi.servicesTitle,
        color: Color.textPrimary,
      },
      servicesCongig: {
        servicesColor: 'text.primary',
        services: [
          contentAi.service1,
          contentAi.service2,
          contentAi.service3,
          contentAi.service4,
          contentAi.service5,
        ],
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

  private async getContent(input: CreateInput): Promise<FeatureTwoContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateTwoContent({
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
      throw new Error('Failed to generate content for FeatureOneContent.');
    }
  }
}
