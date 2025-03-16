import { TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { Address, SocialsConfig } from '../types';

type Output = {
  socialsConfig: SocialsConfig;
  number: TextData;
  email: TextData;
  address: Address;
};

export class ContactFourVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      basic: {
        backgroundColor: 'common.neutral',
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
      },
      [LanguageType.arabic]: {
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
      },
    };
    return { ...content[input.mainLanguage], ...content['basic'] };
  }
}
