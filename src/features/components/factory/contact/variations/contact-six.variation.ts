import { ButtonData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  button: ButtonData & { icon: string };
  number: TextData;
  email: TextData;
  WhatsApp: TextData;
  telegram: TextData;
  title: TextData;
  subtitle: TextData;
};

export class ContactSixVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      [LanguageType.english]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          icon: 'ic:round-send',
          text: 'Send',
        },
        number: {
          color: 'text.primary',
          text: '+963 987654321',
        },
        email: {
          color: 'text.primary',
          text: 'info@info.sy',
        },
        WhatsApp: {
          color: 'text.primary',
          text: '+963 987654321',
        },
        telegram: {
          color: 'text.primary',
          text: '@info',
        },
        title: {
          color: 'primary.main',
          text: 'Stay Connected with Us',
        },
        subtitle: {
          color: 'text.primary',
          text: 'Stay Connected with Us',
        },
      },
      [LanguageType.arabic]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          icon: 'ic:round-send',
          text: 'ارسال',
        },
        number: {
          color: 'text.primary',
          text: '+963 987654321',
        },
        email: {
          color: 'text.primary',
          text: 'info@info.sy',
        },
        WhatsApp: {
          color: 'text.primary',
          text: '+963 987654321',
        },
        telegram: {
          color: 'text.primary',
          text: '@info',
        },
        title: {
          color: 'primary.main',
          text: 'تواصل معنا الان',
        },
        subtitle: {
          color: 'text.primary',
          text: 'نحن نقدر تعاونكم معنا',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
