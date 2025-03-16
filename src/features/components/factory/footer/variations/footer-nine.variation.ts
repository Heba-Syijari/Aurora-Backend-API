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
  projectDescription: TextData;
};

export class FooterNineVariation implements IComponentVariationFactory {
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
        projectDescription: {
          color: 'text.secondary',
          text: 'project description',
        },
      },
      [LanguageType.arabic]: {
        ...basics,
        copyRights: {
          color: 'common.white',
          text: 'حقوق النشر',
        },
        projectDescription: {
          color: 'text.secondary',
          text: 'شرح المشروع',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
