import { ImageData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  images: ImageData[];
  description: TextData;
  title: TextData;
};

export class GalleryThreeVariation implements IComponentVariationFactory {
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
        description: {
          text: 'Oh feel if up to till like. He an thing rapid these after going drawn or. Timed she his law thespoil round defer. In surprise concerns informed betrayed he learning is ye. Ignorantformerly so ye blessing. He as spoke avoid given downs money on we. Of properly carriageshutters ye as wandered up repeated moreover.',
          color: 'text.primary',
        },
      },
      [LanguageType.arabic]: {
        title: {
          color: 'text.primary',
          text: 'عنوان ',
        },
        description: {
          text: 'أوه أشعر إذا حتى مثل. انه شيء سريع هذه بعد الذهاب رسمها أو. توقيت انها قانونه غنيمة جولة تأجيل. في المخاوف مفاجأة أبلغ خيانة انه التعلم هو انتم. جاهلسابقا حتى انتم نعمة. كما تحدث تجنب إعطاء المال على نحن. من صواعق العربات بشكل صحيح كما تجولت تكررت علاوة على ذلك.',
          color: 'text.primary',
        },
      },
    };
    return { ...content[input.mainLanguage], images: content['images'] };
  }
}
