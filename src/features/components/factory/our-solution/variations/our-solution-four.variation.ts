import { ImageData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  title: TextData;
  postTitle: TextData;
  description: TextData;
  solutions_1: TextData;
  solutions_2: TextData;
  solutions_3: TextData;
  solutions_4: TextData;
  image: ImageData;
};
export class OurSolutionFourVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'Our Solution',
          color: 'text.primary',
        },
        postTitle: {
          text: 'This is a postTitle',
          color: 'text.secondary',
        },
        description: {
          text: `Whether it's engaging in conversations, obtaining information, or
seeking assistance, Kawn emerges as a versatile companion,`,
          color: 'text.secondary',
        },
        image: {
          url: 'https://static.vecteezy.com/system/resources/previews/006/304/593/non_2x/abstract-white-and-light-grey-geometric-square-overlapped-pattern-on-background-with-shadow-modern-silver-color-cube-shape-with-copy-space-simple-and-minimal-banner-design-eps10-vector.jpg',
          alt: 'text.primary',
        },
        solutions_1: {
          text: 'This is a postTitle',
          color: 'text.primary',
        },
        solutions_2: {
          text: 'This is a postTitle',
          color: 'text.primary',
        },
        solutions_3: {
          text: 'This is a postTitle',
          color: 'text.primary',
        },
        solutions_4: {
          text: 'This is a postTitle',
          color: 'text.primary',
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'حلولنا',
          color: 'text.primary',
        },
        postTitle: {
          text: 'عنوان فرعي',
          color: 'text.secondary',
        },
        description: {
          text: `شرح هنا`,
          color: 'text.secondary',
        },
        image: {
          url: 'https://static.vecteezy.com/system/resources/previews/006/304/593/non_2x/abstract-white-and-light-grey-geometric-square-overlapped-pattern-on-background-with-shadow-modern-silver-color-cube-shape-with-copy-space-simple-and-minimal-banner-design-eps10-vector.jpg',
          alt: 'text.primary',
        },
        solutions_1: {
          text: 'عنوان فرعي',
          color: 'text.primary',
        },
        solutions_2: {
          text: 'عنوان فرعي',
          color: 'text.primary',
        },
        solutions_3: {
          text: 'عنوان فرعي',
          color: 'text.primary',
        },
        solutions_4: {
          text: 'عنوان فرعي',
          color: 'text.primary',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
