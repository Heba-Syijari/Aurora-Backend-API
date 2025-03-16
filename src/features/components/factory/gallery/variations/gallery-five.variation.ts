import { ImageData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  images: ImageData[];
  title: TextData;
};

export class GalleryFiveVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      images: [
        {
          alt: 'image1',
          url: 'https://picsum.photos/512/512?random=1',
        },
        {
          alt: 'image2',
          url: 'https://picsum.photos/512/512?random=2',
        },
        {
          alt: 'image3',
          url: 'https://picsum.photos/512/512?random=3',
        },
        {
          alt: 'image4',
          url: 'https://picsum.photos/512/512?random=4',
        },
        {
          alt: 'image5',
          url: 'https://picsum.photos/512/512?random=5',
        },
        {
          alt: 'image6',
          url: 'https://picsum.photos/512/512?random=6',
        },
      ],
      [LanguageType.english]: {
        title: {
          color: 'text.primary',
          text: 'title',
        },
      },
      [LanguageType.arabic]: {
        title: {
          color: 'text.primary',
          text: 'العنوان الاساسي',
        },
      },
    };
    return { ...content[input.mainLanguage], images: content['images'] };
  }
}
