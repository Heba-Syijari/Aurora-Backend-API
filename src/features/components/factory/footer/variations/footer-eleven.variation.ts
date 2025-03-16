import { ButtonData, TextData } from 'src/features/components/types';
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
  button: ButtonData & { icon: string };
  copyRights: TextData;
  subtitle: TextData;
  title: TextData;
  logo: {
    type: string;
    value: string;
  };
};

export class FooterElevenVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const basics = {
      menusCongig: {
        headingColor: 'common.white',
        childrenColor: 'common.white',
      },
      socialsConfig: {
        socials: {
          facebook: 'https://facebook.com/#',
          instagram: 'https://instagram.com/#',
          linkedin: 'https://linkedin.com/in/#',
          twitter: 'https://twitter.com/#',
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
        subtitle: {
          color: 'common.white',
          text: 'subtitle',
        },
        title: {
          color: 'common.white',
          text: 'title',
        },
        button: {
          backgroundColor: 'common.white',
          color: 'primary.main',
          linkTo: '',
          text: 'buy now',
          icon: 'icon-park-outline:magic',
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
        subtitle: {
          color: 'common.white',
          text: 'عنوان فرعي',
        },
        title: {
          color: 'common.white',
          text: 'عنوان',
        },
        button: {
          backgroundColor: 'common.white',
          color: 'primary.main',
          linkTo: '',
          text: 'اشتري الان',
          icon: 'icon-park-outline:magic',
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
