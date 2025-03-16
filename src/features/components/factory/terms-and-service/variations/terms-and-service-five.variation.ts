import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { Config } from '../types';

type Output = {
  config: Config;
};

export class TermsAndServiceFiveVariation
  implements IComponentVariationFactory
{
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      descriptionTextColor: 'text.secondary',
      titleTextColor: 'text.primary',
    };
    const content = {
      [LanguageType.english]: {
        config: {
          ...config,
          items: [
            {
              title: 'What is our Copy Write?',
              description:
                'Our Copy Write outlines how we handle your data and protect your copy wite.',
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
              title: 'How can you contact us for copy wite concerns?',
              description:
                'You can contact us through the support section for any copy wite-related queries.',
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        config: {
          ...config,
          items: [
            {
              title: 'ما هي الشروط والخدمات لدينا?',
              description:
                'تحدد شروطنا وخدماتنا كيفية تعاملنا مع بياناتك وحماية شروطك.',
            },
            {
              title: 'كيف نقوم بجمع المعلومات الخاصة بك?',
              description:
                'نقوم بجمع معلوماتك من خلال النماذج وملفات تعريف الارتباط وتفاعلات المستخدم على منصتنا.',
            },
            {
              title: 'كيف يتم تخزين البيانات الخاصة بك بشكل آمن?',
              description:
                'يتم تخزين البيانات الخاصة بك بشكل آمن مع تدابير التشفير والتحكم في الوصول.',
            },
            {
              title: 'يمكنك تحديث المعلومات الشخصية الخاصة بك?',
              description:
                'نعم ، يمكنك تحديث معلوماتك الشخصية من إعدادات حسابك.',
            },
            {
              title: 'ما هي البيانات التي نجمعها من المستخدمين?',
              description:
                'نقوم بجمع البيانات مثل الاسم والبريد الإلكتروني وسلوك الاستخدام لتحسين خدماتنا.',
            },
            {
              title: 'كيف يمكنك الاتصال بنا للحصول على نسخ مخاوف الكتابة?',
              description:
                'يمكنك الاتصال بنا من خلال قسم الدعم للحصول على أي استفسارات متعلقة بنسخة.',
            },
          ],
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
