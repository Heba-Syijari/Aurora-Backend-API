import { ImageData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  titlePartOne: TextData;
  titlePartTwo: TextData;
  image: ImageData;
  config: {
    clients: { image: string; link: string }[];
  };
};
export class OurClientsOneVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      basics: {
        image: {
          alt: 'bg-our-clients',
          url: 'https://static.vecteezy.com/system/resources/previews/006/304/593/non_2x/abstract-white-and-light-grey-geometric-square-overlapped-pattern-on-background-with-shadow-modern-silver-color-cube-shape-with-copy-space-simple-and-minimal-banner-design-eps10-vector.jpg',
        },
        config: {
          clients: [
            {
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFS_mg_CJeD43w3oOAW2Jj6QSVDKgAT5Yf2g&s',
              link: 'ssss',
            },
            {
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcbeItY0dSbamoTAGRTZ3NXIoJhQIhJvqXOA&s',
              link: 'ssss',
            },
            {
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvidSWjyr5Jk5cveKv3jgbeUIMMFh2_yCoOw&s',
              link: 'ssss',
            },
            {
              image:
                'https://miro.medium.com/v2/resize:fit:1400/1*opn1wt7cJxF3a4KnqHItVw.jpeg',
              link: 'ssss',
            },
          ],
        },
      },
      [LanguageType.english]: {
        titlePartOne: {
          color: 'common.white',
          text: 'our',
        },
        titlePartTwo: {
          color: 'primary.main',
          text: 'amazing clients',
        },
      },
      [LanguageType.arabic]: {
        titlePartOne: {
          color: 'common.white',
          text: 'زبائننا',
        },
        titlePartTwo: {
          color: 'primary.main',
          text: 'الرائعين',
        },
      },
    };
    return { ...content[input.mainLanguage], ...content['basics'] };
  }
}
