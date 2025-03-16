import { ImageData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  image: ImageData;
  title: TextData;
  config: {
    titleTextColor: string;
    slides: { title: string; image: string }[];
  };
};

export class GallerySevenVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const slides = [
      {
        title: 'One',
        image: 'https://picsum.photos/512/512?random=1',
      },
      {
        title: 'Two',
        image: 'https://picsum.photos/512/512?random=2',
      },
      {
        title: 'Three',
        image: 'https://picsum.photos/512/512?random=3',
      },
      {
        title: 'Four',
        image: 'https://picsum.photos/512/512?random=4',
      },
      {
        title: 'Five',
        image: 'https://picsum.photos/512/512?random=5',
      },
      {
        title: 'Six',
        image: 'https://picsum.photos/512/512?random=6',
      },
    ];
    const content = {
      basics: {
        config: {
          titleTextColor: 'text.primary',
          slides,
        },
        image: {
          alt: 'image1',
          url: 'https://static.vecteezy.com/system/resources/previews/006/304/593/non_2x/abstract-white-and-light-grey-geometric-square-overlapped-pattern-on-background-with-shadow-modern-silver-color-cube-shape-with-copy-space-simple-and-minimal-banner-design-eps10-vector.jpg',
        },
      },
      [LanguageType.english]: {
        title: {
          text: 'Testimonials',
          color: 'text.primary',
        },
      },
      [LanguageType.arabic]: {
        title: {
          color: 'text.primary',
          text: 'العنوان الاساسي',
        },
      },
    };
    return { ...content[input.mainLanguage], ...content['basics'] };
  }
}
