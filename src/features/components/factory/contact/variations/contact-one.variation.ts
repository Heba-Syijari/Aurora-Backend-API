import { TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { Address, SocialsConfig } from '../types';

type Output = {
  mapConfig: {
    markerColor: string;
    markerPosition: number[];
  };
  openingHours: {
    workTimes: {
      days: TextData;
      hours: TextData;
    };
    firstHoliday: {
      days: TextData;
      hours: TextData;
    };
    secondHoliday: {
      days: TextData;
      hours: TextData;
    };
  };
  socialsConfig: SocialsConfig;
  address: Address;
  title: TextData;
  number: TextData;
  email: TextData;
};
export class ContactOneVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      basic: {
        mapConfig: {
          markerColor: 'primary.main',
          markerPosition: [33.5138, 36.2765],
        },
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
        number: {
          color: 'text.primary',
          text: '+963 987654321',
        },
        email: {
          color: 'text.primary',
          text: 'info@info.sy',
        },
      },
      [LanguageType.english]: {
        address: {
          city: {
            color: 'text.primary',
            text: 'city',
          },
          streetAddress: {
            color: 'text.primary',
            text: 'streetAddress',
          },
        },
        openingHours: {
          workTimes: {
            days: { text: 'Monday - Friday', color: 'text.primary' },
            hours: { text: '9:00 AM - 6:00 PM', color: 'text.primary' },
          },
          firstHoliday: {
            days: { text: 'Saturday', color: 'text.primary' },
            hours: { text: '10:00 AM - 2:00 PM', color: 'text.primary' },
          },
          secondHoliday: {
            days: { text: 'Sunday', color: 'text.primary' },
            hours: { text: '10:00 AM - 2:00 PM', color: 'text.primary' },
          },
        },
        title: {
          color: 'text.primary',
          text: 'Contact us',
        },
      },
      [LanguageType.arabic]: {
        address: {
          city: {
            color: 'text.primary',
            text: 'المدينة',
          },
          streetAddress: {
            color: 'text.primary',
            text: 'عنوان الشارع',
          },
        },
        openingHours: {
          workTimes: {
            days: { text: ' الجمعة - الاثنين', color: 'text.primary' },
            hours: { text: '9:00 AM - 6:00 PM', color: 'text.primary' },
          },
          firstHoliday: {
            days: { text: 'السبت', color: 'text.primary' },
            hours: { text: '10:00 AM - 2:00 PM', color: 'text.primary' },
          },
          secondHoliday: {
            days: { text: 'الاحد', color: 'text.primary' },
            hours: { text: '10:00 AM - 2:00 PM', color: 'text.primary' },
          },
        },
        title: {
          color: 'text.primary',
          text: 'تواصل معتا',
        },
      },
    };
    return { ...content[input.mainLanguage], ...content['basic'] };
  }
}
