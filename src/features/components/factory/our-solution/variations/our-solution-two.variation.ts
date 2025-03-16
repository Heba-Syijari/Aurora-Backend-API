import { TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  title: TextData;
  postTitle: TextData;
  config: {
    titleColor: string;
    descriptionColor: string;
    content: {
      title: string;
      description: string;
      image: string;
    }[];
  };
};
export class OurSolutionTwoVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'Our Solution',
          color: 'text.primary',
        },
        postTitle: {
          text: 'This is a postTitle',
          color: 'text.primary',
        },
        config: {
          titleColor: 'text.primary',
          descriptionColor: 'text.primary',
          content: [
            {
              title: 'Ready-Made Solutions',
              description:
                'Excepteur sint occaecatcupidatat non proident,sunt in culpa qui officiadeserunt',
              image:
                'https://www.telenabler.com/images/solution_banner1.jpg?crc=312141859',
            },
            {
              title: 'Ready-Made Solutions',
              description:
                'Excepteur sint occaecatcupidatat non proident,sunt in culpa qui officiadeserunt',
              image:
                'https://solutas.com.my/wp-content/uploads/2018/06/tn-technical-support-650x350.jpg',
            },
            {
              title: 'Ready-Made Solutions',
              description:
                'Excepteur sint occaecatcupidatat non proident,sunt in culpa qui officiadeserunt',
              image:
                'https://china-license.de/media/images/123rf-70839015_l-nicoelnino-3-ebenen-our-solution.jpg',
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'حلولنا',
          color: 'text.primary',
        },
        postTitle: {
          text: 'عنوان فرعي',
          color: 'text.primary',
        },
        config: {
          titleColor: 'text.primary',
          descriptionColor: 'text.primary',
          content: [
            {
              title: 'عنوان',
              description: 'بعض الشرح هنا',
              image:
                'https://www.telenabler.com/images/solution_banner1.jpg?crc=312141859',
            },
            {
              title: 'عنوان',
              description: 'بعض الشرح هنا',
              image:
                'https://solutas.com.my/wp-content/uploads/2018/06/tn-technical-support-650x350.jpg',
            },
            {
              title: 'عنوان',
              description: 'بعض الشرح هنا',
              image:
                'https://china-license.de/media/images/123rf-70839015_l-nicoelnino-3-ebenen-our-solution.jpg',
            },
          ],
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
