import { TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { Config } from '../types';

type Output = {
  title: TextData;
  config: Config;
};
export class SupscriptionOneVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      titleTextColor: 'primary.main',
      descriptionTextColor: 'text.secondary',
      priceTextColor: 'text.primary',
      periodTextColor: 'text.secondary',
      featuresTextColor: 'text.primary',
    };
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'title',
          color: 'text.primary',
        },
        config: {
          ...config,
          subscriptions: [
            {
              title: 'Basic',
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
              price: '19.99',
              period: 'month',
              features: [
                '5 user accounts',
                '50 GB storage',
                'Priority email support',
              ],
              description: 'Ideal for small teams or growing needs.',
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
              description: 'Perfect for larger teams or businesses.',
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
        config: {
          ...config,
          subscriptions: [
            {
              title: 'أساسي',
              price: '9.99',
              period: 'شهرياً',
              features: ['حساب لكل مستخدكم', 'مساحة تخزينية   5 GB'],
              description: 'افضل خيار تبدأ به بالنسبة للافراد',
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
              description: 'مثالي للفرق الصغيرة أو الاحتياجات المتزايدة.',
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
              description: 'مثالي للفرق أو الشركات الأكبر حجمًا.',
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
