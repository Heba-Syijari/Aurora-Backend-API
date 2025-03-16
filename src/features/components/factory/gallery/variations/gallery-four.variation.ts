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

export class GalleryFourVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      images: [
        {
          alt: 'image1',
          url: 'https://picsum.photos/512/512?random=5',
        },
        {
          alt: 'image2',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrwfH34TnIlJ4mbAgmhgDpAGO_puHPly7_sg&s',
        },
        {
          alt: 'image3',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvOm2yFVjsVG8PcFJw6RP4dbTKkC6GdQobsQ&s',
        },
        {
          alt: 'image4',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRckegAap84IrrcwBaZBCqdbEkYBvjYKEil8Q&s',
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
          text: 'عنوان ',
        },
      },
    };
    return { ...content[input.mainLanguage], images: content['images'] };
  }
}
