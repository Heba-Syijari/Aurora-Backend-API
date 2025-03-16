import { TextData } from 'src/features/components/types';
import { ContentGeneratorService } from 'src/features/content-generator/content-generator.service';
import { PrivacyPolicyOneContent } from 'src/features/content-generator/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { Config, PrivacyPoliceVariation } from '../types';

type Output = {
  description: TextData;
  title: TextData;
  config: Config;
};

export class PrivacyPoliceFourVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      [LanguageType.english]: {
        config: {
          descriptionTextColor: 'text.secondary',
          titleTextColor: 'text.primary',
          items: [
            {
              title: 'What is our privacy policy?',
              description:
                'Our privacy policy outlines how we handle your data and protect your privacy.',
            },
            {
              title: 'How do we collect your information?',
              description:
                'We collect your information through forms, cookies, and user interactions on our platform.',
            },
            {
              title: 'How is your data stored securely?',
              description:
                'Your data is stored securely with encryption and access control measures.',
            },
            {
              title: 'Can you update your personal information?',
              description:
                'Yes, you can update your personal information from your account settings.',
            },
            {
              title: 'What data do we collect from users?',
              description:
                'We collect data such as name, email, and usage behavior to improve our services.',
            },
            {
              title: 'How can you contact us for privacy concerns?',
              description:
                'You can contact us through the support section for any privacy-related queries.',
            },
          ],
        },
        title: {
          text: 'privacy policy',
          color: 'primary.main',
        },
        description: {
          text: 'Learn about how we handle your data and ensure your privacy is protected. Below are common questions and answers regarding our privacy practices.',
          color: 'text.secondary',
        },
      },
      [LanguageType.arabic]: {
        config: {
          descriptionTextColor: 'text.secondary',
          titleTextColor: 'text.primary',
          items: [
            {
              title: 'ما هي سياسة الخصوصية الخاصة بنا ؟',
              description:
                'توضح سياسة الخصوصية الخاصة بنا كيفية تعاملنا مع بياناتك وحماية خصوصيتك',
            },
            {
              title: 'كيف نقوم بجمع المعلومات الخاصة بك?',
              description:
                'Weنقوم بجمع معلوماتك من خلال النماذج وملفات تعريف الارتباط وتفاعلات المستخدم على منصتنا',
            },
            {
              title: 'كيف يتم تخزين البيانات الخاصة بك بشكل آمن?',
              description:
                'يتم تخزين البيانات الخاصة بك بشكل آمن مع تدابير التشفير والتحكم في الوصول.',
            },
            {
              title: 'هل يمكنك تحديث معلوماتك الشخصية?',
              description:
                'نعم ، يمكنك تحديث معلوماتك الشخصية من إعدادات حسابك.',
            },
            {
              title: 'ما هي البيانات التي نجمعها من المستخدمين?',
              description:
                'نقوم بجمع البيانات مثل الاسم والبريد الإلكتروني وسلوك الاستخدام لتحسين خدماتنا.',
            },
            {
              title: 'كيف يمكنك الاتصال بنا للحصول على مخاوف الخصوصية?',
              description:
                'يمكنك الاتصال بنا من خلال قسم الدعم لأية استفسارات متعلقة بالخصوصية.',
            },
          ],
        },
        title: {
          text: 'سياسة الخصوصية',
          color: 'primary.main',
        },
        description: {
          text: 'تعرف على كيفية تعاملنا مع بياناتك وضمان حماية خصوصيتك. فيما يلي الأسئلة والأجوبة الشائعة المتعلقة بممارسات الخصوصية الخاصة بنا.',
          color: 'text.secondary',
        },
      },
    };
    if (!input.generateAI) return { ...content[input.mainLanguage] };

    // return content use AI
    const contentAi = await this.getContent(input);
    return {
      config: {
        descriptionTextColor: 'text.secondary',
        titleTextColor: 'text.primary',
        items: contentAi.items,
      },
      title: content[input.mainLanguage].title,
      description: content[input.mainLanguage].description,
    };
  }

  private async getContent(
    input: CreateInput,
  ): Promise<PrivacyPolicyOneContent> {
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
          PrivacyPoliceVariation.PRIVACY_POLICY_FOUR,
        )) as PrivacyPolicyOneContent;
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
