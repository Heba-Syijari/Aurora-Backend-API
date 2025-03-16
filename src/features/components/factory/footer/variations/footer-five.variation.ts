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
  title: TextData;
  subtitle: TextData;
  copyRights: TextData;
  button: ButtonData;
};

export class FooterFiveVariation implements IComponentVariationFactory {
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
        title: {
          color: 'common.white',
          text: 'Ready for a next project?',
        },
        subtitle: {
          color: 'common.white',
          text: ' Let’s get started!',
        },
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'Contact Us',
        },
        copyRights: {
          color: 'text.primary',
          text: 'copy rights copy rights',
        },
      },
      [LanguageType.arabic]: {
        ...basics,
        title: {
          color: 'common.white',
          text: 'هل انت مستهد للمشروع التالي ؟',
        },
        subtitle: {
          color: 'common.white',
          text: ' هيا بنا نبدأ',
        },
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'تواصل معنا',
        },
        copyRights: {
          color: 'text.primary',
          text: 'جميع الحقوق محفوظة',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
