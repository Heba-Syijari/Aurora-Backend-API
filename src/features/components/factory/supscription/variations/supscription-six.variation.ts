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
  description: TextData;
  config: Config;
};

export class SupscriptionSixVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      titleTextColor: 'text.primary',
      subtitleTextColor: 'text.primary',
      descriptionTextColor: 'text.primary',
      priceTextColor: 'text.primary',
      periodTextColor: 'text.primary',
      featuresTextColor: 'text.primary',
    };
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'Pricing',
          color: 'text.primary',
        },
        subtitle: {
          text: 'Affordable pricing plans',
          color: 'text.primary',
        },
        description: {
          color: 'text.secondary',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id arcu, convallis est sed. Proin nulla eu a vitae lectus leo suscipit.',
        },
        config: {
          ...config,
          subscriptions: [
            {
              title: 'Basic',
              subtitle: 'For individuals',
              price: '9.99',
              period: 'month',
              features: ['1 user account', '5 GB storage'],
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
              subtitle: 'For startups',
              price: '19.99',
              period: 'month',
              features: [
                '5 user accounts',
                '50 GB storage',
                'Priority email support',
              ],
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
              subtitle: 'For big companies',
              price: '49.99',
              period: 'month',
              features: [
                'Email support',
                'Unlimited users',
                '200 GB storage',
                '24/7 support',
              ],
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
          color: 'text.primary',
        },
        subtitle: {
          text: 'عنوان فرعي',
          color: 'text.primary',
        },
        description: {
          color: 'text.secondary',
          text: 'عنوان فرعي عنو عنوان فرعي ان فرعي',
        },
        config: {
          ...config,
          subscriptions: [
            {
              title: 'أساسي',
              subtitle: 'للاشخاص',
              price: '9.99',
              period: 'شهرياً',
              features: [
                'دعم للبريد الالكتروني',
                '200 GB مساحة تخزينية',
                '24/7 دعم',
              ],
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
              subtitle: 'For startups',
              price: '19.99',
              period: 'شهرياً',
              features: [
                'دعم للبريد الالكتروني',
                'مستخدمون غير محدودون',
                '200 GB مساحة تخزينية',
                '24/7 دعم',
              ],
              description: 'الاشتراك الافضل للأشخاص',
              button: {
                backgroundColor: 'primary.main',
                color: 'common.white',
                linkTo: '',
                text: 'اشتري الان',
              },
            },
            {
              title: 'الاغلى',
              subtitle: 'للشركات الكبرى',
              price: '49.99',
              period: 'شهرياً',
              features: [
                'خمس حسابات',
                ' 50 غ مساحة تخزينية',
                ' دعم للبريد الالكتروني',
              ],
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
