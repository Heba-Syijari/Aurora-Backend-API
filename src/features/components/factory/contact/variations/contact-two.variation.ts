import { ButtonData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { Address, SocialsConfig } from '../types';

type Output = {
  button: ButtonData;
  socialsConfig: SocialsConfig;
  address: Address;
  number: TextData;
  email: TextData;
  title: TextData;
};

export class ContactTwoVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      basic: {
        socialsConfig: {
          socials: {
            facebook: 'https://facebook.com/#',
            instagram: 'https://instagram.com/#',
            linkedin: 'https://linkedin.com/in/#',
            twitter: 'https://twitter.com/#',
          },
          socialIconsColor: 'primary.main',
        },
      },
      [LanguageType.english]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'Send',
        },
        address: {
          city: {
            color: 'text.primary',
            text: 'city',
          },
          streetAddress: {
            color: 'text.primary',
            text: 'streetAddress',
          },
        },
        number: {
          color: 'text.primary',
          text: '+963 987654321',
        },
        email: {
          color: 'text.primary',
          text: 'info@info.sy',
        },
        title: {
          color: 'text.primary',
          text: 'Stay Connected with Us',
        },
      },
      [LanguageType.arabic]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'ارسال',
        },
        address: {
          city: {
            color: 'text.primary',
            text: 'المدينة',
          },
          streetAddress: {
            color: 'text.primary',
            text: 'عنوان الشارع',
          },
        },
        number: {
          color: 'text.primary',
          text: '+963 987654321',
        },
        email: {
          color: 'text.primary',
          text: 'info@info.sy',
        },
        title: {
          color: 'text.primary',
          text: 'ابقى على تواصل معنا',
        },
      },
    };
    return { ...content[input.mainLanguage], ...content['basic'] };
  }
}
