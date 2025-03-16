import { TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { Config } from '../types';

type Output = {
  title: TextData;
  subtitle: TextData;
  config: Config;
};

export class SupscriptionThreeVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      titleTextColor: 'text.primary',
      priceTextColor: 'primary.main',
      periodTextColor: 'text.primary',
      featuresTextColor: 'text.primary',
    };
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'title',
          color: 'text.primary',
        },
        subtitle: {
          text: 'subtitle',
          color: 'text.secondary',
        },
        config: {
          ...config,
          subscriptions: [
            {
              title: 'Basic',
              price: '9.99',
              period: 'month',
              features: ['1 user account', '5 GB storage'],
              button: {
                backgroundColor: 'background.neutral',
                color: 'primary.main',
                linkTo: '',
                text: 'buy now',
              },
            },
            {
              title: 'Standard',
              price: '19.99',
              period: 'month',
              features: [
                '5 user accounts',
                '50 GB storage',
                'Priority email support',
              ],
              button: {
                backgroundColor: 'background.neutral',
                color: 'primary.main',
                linkTo: '',
                text: 'buy now',
              },
            },
            {
              title: 'Premium',
              price: '49.99',
              period: 'month',
              features: [
                'Email support',
                'Unlimited users',
                '200 GB storage',
                '24/7 support',
              ],
              button: {
                backgroundColor: 'background.neutral',
                color: 'primary.main',
                linkTo: '',
                text: 'buy now',
              },
            },
            {
              title: 'Premium',
              price: '49.99',
              period: 'month',
              features: [
                'Email support',
                'Unlimited users',
                '200 GB storage',
                '24/7 support',
              ],
              button: {
                backgroundColor: 'background.neutral',
                color: 'primary.main',
                linkTo: '',
                text: 'buy now',
              },
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'عنوان',
          color: 'text.primary',
        },
        subtitle: {
          text: 'عنوان فرعي',
          color: 'text.secondary',
        },
        config: {
          ...config,
          subscriptions: [
            {
              title: 'الأساسي',
              price: '9.99',
              period: 'شهرياً',
              features: ['1 حساب للمستخدم', '5 GB مساحة تخزينية'],
              button: {
                backgroundColor: 'background.neutral',
                color: 'primary.main',
                linkTo: '',
                text: 'اشتري الان',
              },
            },
            {
              title: 'أساسي',
              price: '19.99',
              period: 'شهرياً',
              features: [
                'خمس حسابات',
                ' 50 غ مساحة تخزينية',
                ' دعم للبريد الالكتروني',
              ],
              button: {
                backgroundColor: 'background.neutral',
                color: 'primary.main',
                linkTo: '',
                text: 'اشتري الان',
              },
            },
            {
              title: 'الافضل',
              price: '49.99',
              period: 'شهرياً',

              features: [
                'دعم للبريد الالكتروني',
                'مستخدمون غير محدودون',
                '200 GB مساحة تخزينية',
                '24/7 دعم',
              ],
              button: {
                backgroundColor: 'background.neutral',
                color: 'primary.main',
                linkTo: '',
                text: 'اشتري الان',
              },
            },
            {
              title: 'الافضل',
              price: '49.99',
              period: 'شهرياً',

              features: [
                'دعم للبريد الالكتروني',
                'مستخدمون غير محدودون',
                '200 GB مساحة تخزينية',
                '24/7 دعم',
              ],
              button: {
                backgroundColor: 'background.neutral',
                color: 'primary.main',
                linkTo: '',
                text: 'اشتري الان',
              },
            },
          ],
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
