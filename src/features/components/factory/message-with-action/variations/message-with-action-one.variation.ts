import { ButtonData, ImageData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  projectDescription: TextData;
  projectTitle: TextData;
  projectName: TextData;
  image: ImageData;
  backgroundImage: ImageData;
  button: ButtonData;
};
export class MessageWithActionOneVariation
  implements IComponentVariationFactory
{
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      [LanguageType.english]: {
        projectTitle: {
          color: 'common.white',
          text: 'project Title',
        },
        projectDescription: {
          color: 'common.white',
          text: 'project Description',
        },
        projectName: {
          color: 'common.white',
          text: 'title',
        },
        image: {
          alt: 'footer-bg-image',
          url: 'https://picsum.photos/640/480?random=1',
        },
        backgroundImage: {
          alt: 'footer-bg-image',
          url: 'https://picsum.photos/640/480?random=1',
        },

        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'buy now',
          icon: 'iconoir:fast-arrow-right',
        },
      },

      [LanguageType.arabic]: {
        projectTitle: {
          color: 'common.white',
          text: 'عنوان المشروع',
        },
        projectDescription: {
          color: 'common.white',
          text: 'وصف المشروع',
        },
        projectName: {
          color: 'common.white',
          text: 'اسم المشروع',
        },
        image: {
          alt: 'footer-bg-image',
          url: 'https://picsum.photos/640/480?random=1',
        },
        backgroundImage: {
          alt: 'footer-bg-image',
          url: 'https://picsum.photos/640/480?random=1',
        },
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'إشتري الأن',
          icon: 'iconoir:fast-arrow-right',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
