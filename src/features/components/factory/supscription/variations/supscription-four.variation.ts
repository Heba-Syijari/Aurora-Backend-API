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

export class SupscriptionFourVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      titleTextColor: 'text.primary',
      subtitleTextColor: 'text.primary',
      iconColor: 'primary.main',
      priceTextColor: 'text.primary',
      periodTextColor: 'text.primary',
      featuresTextColor: 'common.white',
      descriptionTextColor: 'text.secondary',
    };
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'title',
          color: 'primary.main',
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
              icon: 'uil:bag',
              description: 'The perfect starter plan for individuals.',
              button: {
                backgroundColor: 'primary.main',
                color: 'common.white',
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
              icon: 'uil:bag',
              description: 'The perfect starter plan for individuals.',
              button: {
                backgroundColor: 'primary.main',
                color: 'common.white',
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
              icon: 'uil:bag',
              description: 'The perfect starter plan for individuals.',
              button: {
                backgroundColor: 'primary.main',
                color: 'common.white',
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
          color: 'primary.main',
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
              icon: 'uil:bag',
              description: 'الاشتراك الافضل للأشخاص',
              button: {
                backgroundColor: 'primary.main',
                color: 'common.white',
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
              icon: 'uil:bag',
              description: 'الاشتراك الافضل للأشخاص',
              button: {
                backgroundColor: 'primary.main',
                color: 'common.white',
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
              icon: 'uil:bag',
              description: 'الاشتراك الافضل للأشخاص',
              button: {
                backgroundColor: 'primary.main',
                color: 'common.white',
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
