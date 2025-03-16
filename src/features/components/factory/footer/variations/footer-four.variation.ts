import { ImageData, TextData } from 'src/features/components/types';
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
  email: TextData;
  address: TextData;
  number: TextData;
  copyRights: TextData;
  latestNews: {
    image: ImageData;
    description: TextData;
  }[];
  images: ImageData[];
};

export class FooterFourVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const basics = {
      latestNews: [
        {
          image: {
            alt: 'image1',
            url: 'https://s3.amazonaws.com/utep-uploads/wp-content/uploads/UAB/2022/07/18193751/Image-2_v1-17-1.jpg',
          },
          description: {
            color: 'text.secondary',
            text: 'description',
          },
        },
        {
          image: {
            alt: 'image1',
            url: 'https://picsum.photos/640/480?random=3',
          },
          description: {
            color: 'text.secondary',
            text: 'description',
          },
        },
      ],
      images: [
        {
          alt: 'image1',
          url: 'https://picsum.photos/640/480?random=2',
        },
        {
          alt: 'image2',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrwfH34TnIlJ4mbAgmhgDpAGO_puHPly7_sg&s',
        },
        {
          alt: 'image3',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFS_mg_CJeD43w3oOAW2Jj6QSVDKgAT5Yf2g&s',
        },
        {
          alt: 'image4',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0b5dNZToHl7vaqOVgFlaNWz7hySUjlkV5Yg&s',
        },
        {
          alt: 'image5',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQYYQuIysHTdh0rCp8iShwzulOYA6lnnLYPA&s',
        },
        {
          alt: 'image6',
          url: 'https://picsum.photos/640/480?random=1',
        },
      ],
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
        email: {
          color: 'text.secondary',
          text: 'email',
        },
        address: {
          color: 'text.secondary',
          text: 'address',
        },
        number: {
          color: 'text.secondary',
          text: 'number',
        },
        copyRights: {
          color: 'common.white',
          text: 'copy rights',
        },
      },
      [LanguageType.arabic]: {
        ...basics,
        email: {
          color: 'text.secondary',
          text: 'الايميل',
        },
        address: {
          color: 'text.secondary',
          text: 'العنوان',
        },
        number: {
          color: 'text.secondary',
          text: 'رقم التواصل',
        },
        copyRights: {
          color: 'common.white',
          text: 'حقوق النشر',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
