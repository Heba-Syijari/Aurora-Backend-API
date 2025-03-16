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
  copyRights: TextData;
  logo: {
    type: string;
    value: string;
  };
};

export class FooterFourteenVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const basics = {
      menusCongig: {
        headingColor: 'common.white',
        childrenColor: 'common.white',
      },
      socialsConfig: {
        socials: {
          facebook: 'https://facebook.com/',
          instagram: 'https://instagram.com/',
          linkedin: 'https://linkedin.com/in/',
          twitter: 'https://twitter.com/',
        },
        socialIconsColor: 'background.neutral',
      },
    };
    const content = {
      [LanguageType.english]: {
        ...basics,
        copyRights: {
          color: 'common.white',
          text: 'copy rights',
        },
        logo: {
          type: 'text',
          value: 'logo',
        },
      },
      [LanguageType.arabic]: {
        ...basics,
        copyRights: {
          color: 'common.white',
          text: 'حقوق النشر',
        },
        logo: {
          type: 'text',
          value: 'شعار هنا',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
