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
  subtitle: TextData;
  title: TextData;
  logo: {
    type: string;
    value: string;
  };
};

export class FooterThirteenVariation implements IComponentVariationFactory {
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
        socialIconsColor: 'secondary.main',
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
          text: 'Hello, we are Lift Media. Our goal is to translate the positive effects from revolutionizing how companies engage with their clients & their team.',
        },
        title: {
          color: 'common.white',
          text: 'Subscribe',
        },
        logo: {
          type: 'text',
          value: 'شعار هنا',
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
          text: 'مرحبا ، نحن رفع وسائل الإعلام. هدفنا هو ترجمة الآثار الإيجابية من إحداث ثورة في كيفية تفاعل الشركات مع عملائها وفريقهم.',
        },
        title: {
          color: 'common.white',
          text: 'اشترك ',
        },
        logo: {
          type: 'text',
          value: 'logo',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
