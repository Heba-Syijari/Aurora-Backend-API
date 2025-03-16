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
  projectName: TextData;
};

export class FooterEightVariation implements IComponentVariationFactory {
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
          color: 'text.secondary',
          text: 'copy rights',
        },
        projectName: {
          color: 'primary.main',
          text: 'project name',
        },
      },
      [LanguageType.arabic]: {
        ...basics,
        copyRights: {
          color: 'text.secondary',
          text: 'حقوق النشر',
        },
        projectName: {
          color: 'primary.main',
          text: 'اسم المشروع',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
