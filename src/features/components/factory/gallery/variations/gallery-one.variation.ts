import { ImageData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  title: TextData;
  subtitle: TextData;
  images: ImageData[];
};
export class GalleryOneVariation implements IComponentVariationFactory {
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
        {
          alt: 'image7',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrwfH34TnIlJ4mbAgmhgDpAGO_puHPly7_sg&s',
        },
        {
          alt: 'image8',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvOm2yFVjsVG8PcFJw6RP4dbTKkC6GdQobsQ&s',
        },
        {
          alt: 'image9',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRckegAap84IrrcwBaZBCqdbEkYBvjYKEil8Q&s',
        },
      ],
      [LanguageType.english]: {
        title: {
          color: 'text.primary',
          text: 'Testimonials',
        },
        subtitle: {
          text: 'subTitle',
          color: 'text.primary',
        },
      },
      [LanguageType.arabic]: {
        title: {
          color: 'text.primary',
          text: 'العنوان الاساسي',
        },
        subtitle: {
          text: 'العنوان الفرعي',
          color: 'text.primary',
        },
      },
    };
    return { ...content[input.mainLanguage], images: content['images'] };
  }
}
