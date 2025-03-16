import { ButtonData, ImageData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  button: ButtonData & { icon: string };
  number: TextData;
  email: TextData;
  WhatsApp: TextData;
  imageTitle: TextData;
  imageSubTitle: TextData;
  title: TextData;
  description: TextData;
  backGroundImage: ImageData;
};

export class ContactSevenVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      [LanguageType.english]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          icon: 'ic:round-send',
          text: 'Send',
        },
        number: {
          color: 'common.white',
          text: '+963 987654321',
        },
        email: {
          color: 'common.white',
          text: 'info@info.sy',
        },
        WhatsApp: {
          color: 'common.white',
          text: '+963 987654321',
        },
        title: {
          color: 'common.white',
          text: 'Contact us',
        },
        imageTitle: {
          color: 'common.white',
          text: 'Contact Information',
        },
        imageSubTitle: {
          color: 'common.white',
          text: 'Say something to start a live chat!',
        },
        backGroundImage: {
          alt: 'image-contact-seven',
          url: 'https://miro.medium.com/v2/resize:fit:1400/1*opn1wt7cJxF3a4KnqHItVw.jpeg',
        },
        description: {
          color: 'text.primary',
          text: 'We appreciate your feedback and eagerly await hearing from you',
        },
      },
      [LanguageType.arabic]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          icon: 'ic:round-send',
          text: 'ارسال',
        },
        number: {
          color: 'common.white',
          text: '+963 987654321',
        },
        email: {
          color: 'common.white',
          text: 'info@info.sy',
        },
        WhatsApp: {
          color: 'common.white',
          text: '+963 987654321',
        },
        title: {
          color: 'common.white',
          text: 'تواصل معنا',
        },
        imageTitle: {
          color: 'common.white',
          text: 'معلومات التواصل',
        },
        imageSubTitle: {
          color: 'common.white',
          text: 'تواصل معنا الان',
        },
        backGroundImage: {
          alt: 'image-contact-seven',
          url: 'https://miro.medium.com/v2/resize:fit:1400/1*opn1wt7cJxF3a4KnqHItVw.jpeg',
        },
        description: {
          color: 'text.primary',
          text: 'نحن نقدر تعاونكم معنا',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
