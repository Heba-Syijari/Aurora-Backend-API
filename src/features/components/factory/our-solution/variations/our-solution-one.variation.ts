import { ImageData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  title: TextData;
  description: TextData;
  image: ImageData;
  config: {
    titleColor: string;
    descriptionColor: string;
    iconColor: string;
    items: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
};
export class OurSolutionOneVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'Our Solution',
          color: 'text.primary',
        },
        image: {
          alt: 'bg-image-hero-one',
          url: 'https://static.vecteezy.com/system/resources/previews/006/304/593/non_2x/abstract-white-and-light-grey-geometric-square-overlapped-pattern-on-background-with-shadow-modern-silver-color-cube-shape-with-copy-space-simple-and-minimal-banner-design-eps10-vector.jpg',
        },
        description: {
          text: '',
          color: 'text.primary',
        },
        config: {
          titleColor: 'text.primary',
          descriptionColor: 'text.primary',
          iconColor: 'primary.main',
          items: [
            {
              title: 'Solution1',
              description:
                'Excepteur sint occaecatcupidatat non proident,sunt in culpa qui officiadeserunt',
              icon: 'uil:bag',
            },
            {
              title: 'Solution2',
              description:
                'Excepteur sint occaecatcupidatat non proident,sunt in culpa qui officiadeserunt',
              icon: 'uil:bag',
            },
            {
              title: 'Solution3',
              description:
                'Excepteur sint occaecatcupidatat non proident,sunt in culpa qui officiadeserunt',
              icon: 'uil:bag',
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'حلولنا',
          color: 'text.primary',
        },
        image: {
          alt: 'bg-image-hero-one',
          url: 'https://static.vecteezy.com/system/resources/previews/006/304/593/non_2x/abstract-white-and-light-grey-geometric-square-overlapped-pattern-on-background-with-shadow-modern-silver-color-cube-shape-with-copy-space-simple-and-minimal-banner-design-eps10-vector.jpg',
        },
        description: {
          text: 'شرح هنا',
          color: 'text.primary',
        },
        config: {
          titleColor: 'text.primary',
          descriptionColor: 'text.primary',
          iconColor: 'primary.main',
          items: [
            {
              title: 'حل 1',
              description: 'بعض الشرح هنا',
              icon: 'uil:bag',
            },
            {
              title: 'حل 2',
              description: 'بعض الشرح هنا',
              icon: 'uil:bag',
            },
            {
              title: 'حل 3',
              description: 'بعض الشرح هنا',
              icon: 'uil:bag',
            },
          ],
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
