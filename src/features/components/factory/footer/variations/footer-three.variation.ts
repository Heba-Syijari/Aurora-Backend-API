import { TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import { SocialsConfig } from '../../contact/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { MenusCongig } from '../types';

type Output = {
  menusCongig: MenusCongig;
  socialsConfig: SocialsConfig;
  email: TextData;
  address: TextData;
  number: TextData;
  copyRights: TextData;
};

export class FooterThreeVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const basics = {
      menusCongig: {
        headingColor: 'text.primary',
        childrenColor: 'text.secondary',
      },
      socialsConfig: {
        socials: {
          facebook: 'https://facebook.com/#',
          instagram: 'https://instagram.com/#',
          linkedin: 'https://linkedin.com/in/#',
          twitter: 'https://twitter.com/#',
        },
        socialIconsColor: 'primary.main',
      },
    };
    const content = {
      [LanguageType.english]: {
        ...basics,
        email: {
          color: 'text.secondary',
          text: 'email',
        },
        address: {
          color: 'text.secondary',
          text: 'address',
        },
        number: {
          color: 'text.secondary',
          text: 'number',
        },
        copyRights: {
          color: 'common.white',
          text: 'copy rights',
        },
      },
      [LanguageType.arabic]: {
        ...basics,
        email: {
          color: 'text.secondary',
          text: 'الايميل',
        },
        address: {
          color: 'text.secondary',
          text: 'العنوان',
        },
        number: {
          color: 'text.secondary',
          text: 'رقم التواصل',
        },
        copyRights: {
          color: 'common.white',
          text: 'حقوق النشر',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
