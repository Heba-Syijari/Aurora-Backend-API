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
  copyRights: TextData;
  projectName: TextData;
  projectDescription: TextData;
  button: ButtonData;
};

export class FooterSevenVariation implements IComponentVariationFactory {
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
        projectName: {
          color: 'text.secondary',
          text: 'project name',
        },
        projectDescription: {
          color: 'common.white',
          text: 'project description',
        },
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'Contact Us',
        },
      },
      [LanguageType.arabic]: {
        ...basics,
        copyRights: {
          color: 'common.white',
          text: 'حقوق النشر',
        },
        projectName: {
          color: 'text.secondary',
          text: 'اسم المشروع',
        },
        projectDescription: {
          color: 'common.white',
          text: 'شرح المشروع',
        },
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'تواصل معنا',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
