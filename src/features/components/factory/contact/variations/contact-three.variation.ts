import { TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { SocialsConfig } from '../types';

type Output = {
  backgroundColor: string;
  socialsConfig: SocialsConfig;
  number: TextData;
  email: TextData;
};

export class ContactThreeVariation implements IComponentVariationFactory {
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
