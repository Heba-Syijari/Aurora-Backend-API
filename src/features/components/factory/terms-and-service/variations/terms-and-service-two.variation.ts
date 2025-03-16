import { TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  parabraph1: TextData;
  parabraph2: TextData;
  subtitle: TextData;
  title: TextData;
};

export class TermsAndServiceTwoVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'Terms And Services',
          color: 'text.primary',
        },
        parabraph1: {
          text: 'Learn about how we handle your data and ensure your terms is protected. Below are common questions and answers regarding our terms practices.',
          color: 'text.secondary',
        },
        subtitle: {
          text: 'subtitle',
          color: 'text.primary',
        },
        parabraph2: {
          text: 'Learn about how we handle your data and ensure your terms is protected. Below are common questions and answers regarding our terms practices.',
          color: 'text.secondary',
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'الشروط والخدمات',
          color: 'text.primary',
        },
        parabraph1: {
          text: 'تعرف على كيفية تعاملنا مع بياناتك وضمان حماية شروطك. فيما يلي الأسئلة والأجوبة الشائعة المتعلقة بممارسات الشروط الخاصة بنا.',
          color: 'text.secondary',
        },
        subtitle: {
          text: 'عنوان فرعي',
          color: 'text.primary',
        },
        parabraph2: {
          text: 'تعرف على كيفية تعاملنا مع بياناتك وضمان حماية شروطك. فيما يلي الأسئلة والأجوبة الشائعة المتعلقة بممارسات الشروط الخاصة بنا.',
          color: 'text.secondary',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
