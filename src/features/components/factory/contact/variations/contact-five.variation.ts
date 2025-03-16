import { ButtonData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  button: ButtonData & { icon: string };
  number: TextData;
  email: TextData;
  title: TextData;
  titleCardOne: TextData;
  titleCardTwo: TextData;
};

export class ContactFiveVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      [LanguageType.english]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'Send',
          icon: 'ic:round-send',
        },
        number: {
          color: 'primary.main',
          text: '+963 333333666',
        },
        email: {
          color: 'primary.main',
          text: 'info@info.sy',
        },
        title: {
          color: 'text.primary',
          text: 'Contact us',
        },
        titleCardOne: {
          color: 'primary.main',
          text: 'Get In Touch With us',
        },
        titleCardTwo: {
          color: 'primary.main',
          text: 'Get In Touch With us',
        },
      },
      [LanguageType.arabic]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'ارسال',
          icon: 'ic:round-send',
        },
        number: {
          color: 'primary.main',
          text: '+963 333333666',
        },
        email: {
          color: 'primary.main',
          text: 'info@info.sy',
        },
        title: {
          color: 'text.primary',
          text: 'تواصل معنا',
        },
        titleCardOne: {
          color: 'primary.main',
          text: 'تواصل معنا',
        },
        titleCardTwo: {
          color: 'primary.main',
          text: 'تواصل معنا',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
