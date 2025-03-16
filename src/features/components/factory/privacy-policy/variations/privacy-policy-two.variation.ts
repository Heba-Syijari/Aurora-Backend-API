import { TextData } from 'src/features/components/types';
import { ContentGeneratorService } from 'src/features/content-generator/content-generator.service';
import { PrivacyPolicyTwoContent } from 'src/features/content-generator/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { PrivacyPoliceVariation } from '../types';

type Output = {
  parabraph1: TextData;
  parabraph2: TextData;
  subtitle: TextData;
  title: TextData;
};

export class PrivacyPoliceTwoVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'Privacy Policy',
          color: 'text.primary',
        },
        parabraph1: {
          text: 'Learn about how we handle your data and ensure your privacy is protected. Below are common questions and answers regarding our privacy practices.',
          color: 'text.secondary',
        },
        subtitle: {
          text: 'subtitle',
          color: 'text.primary',
        },
        parabraph2: {
          text: 'Learn about how we handle your data and ensure your privacy is protected. Below are common questions and answers regarding our privacy practices.',
          color: 'text.secondary',
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'Privacy Policy',
          color: 'text.primary',
        },
        parabraph1: {
          text: 'تعرف على كيفية تعاملنا مع بياناتك وضمان حماية خصوصيتك. فيما يلي الأسئلة والأجوبة الشائعة المتعلقة بممارسات الخصوصية الخاصة بنا.',
          color: 'text.secondary',
        },
        subtitle: {
          text: 'عنوان فرعي',
          color: 'text.primary',
        },
        parabraph2: {
          text: 'تعرف على كيفية تعاملنا مع بياناتك وضمان حماية خصوصيتك. فيما يلي الأسئلة والأجوبة الشائعة المتعلقة بممارسات الخصوصية الخاصة بنا.',
          color: 'text.secondary',
        },
      },
    };
    if (!input.generateAI) return { ...content[input.mainLanguage] };

    // return content use AI
    const contentAi = await this.getContent(input);
    return {
      title: { text: contentAi.title, color: 'text.primary' },
      subtitle: { text: contentAi.subtitle, color: 'text.primary' },
      parabraph1: { text: contentAi.parabraph1, color: 'text.secondary' },
      parabraph2: { text: contentAi.parabraph2, color: 'text.secondary' },
    };
  }

  private async getContent(
    input: CreateInput,
  ): Promise<PrivacyPolicyTwoContent> {
    try {
      if (input.purpose && input.description) {
        return (await this.contentGeneratorService.generatePrivacyPolicyContent(
          {
            purpose: input.purpose,
            mainLanguage: input.mainLanguage,
            description: input.description,
            audience: input.audience,
            userId: input.userId,
          },
          PrivacyPoliceVariation.PRIVACY_POLICY_TWO,
        )) as PrivacyPolicyTwoContent;
      } else {
        throw new Error('Purpose and description must be provided.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error(
        'Failed to generate content for PrivacyPolicyOneContent.',
      );
    }
  }
}
