import { ButtonData, ImageData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  image: ImageData;
  button: ButtonData & { icon: string };
  projectDescription: TextData;
  projectName: TextData;
  logo: {
    type: string;
    value: string;
  };
};

export class FooterTenVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      [LanguageType.english]: {
        projectDescription: {
          color: 'common.white',
          text: 'projectDescription',
        },
        projectName: {
          color: 'common.white',
          text: 'title',
        },
        image: {
          alt: 'footer-bg-image',
          url: 'https://s3.amazonaws.com/utep-uploads/wp-content/uploads/UAB/2022/07/18193751/Image-2_v1-17-1.jpg',
        },
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'buy now',
          icon: 'iconoir:fast-arrow-right',
        },
        logo: {
          type: 'text',
          value: 'شعار',
        },
      },
      [LanguageType.arabic]: {
        projectDescription: {
          color: 'common.white',
          text: 'شرح المشروع',
        },
        projectName: {
          color: 'common.white',
          text: 'عنوان',
        },
        image: {
          alt: 'footer-bg-image',
          url: 'https://s3.amazonaws.com/utep-uploads/wp-content/uploads/UAB/2022/07/18193751/Image-2_v1-17-1.jpg',
        },

        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'اشتري الان ',
          icon: 'iconoir:fast-arrow-right',
        },
        logo: {
          type: 'text',
          value: 'شعار هنا',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
