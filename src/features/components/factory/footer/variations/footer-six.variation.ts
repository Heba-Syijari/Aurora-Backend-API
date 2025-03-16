import { TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { MenusCongig } from '../types';

type Output = {
  menusCongig: MenusCongig;
  projectName: TextData;
  copyRights: TextData;
};

export class FooterSixVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const basics = {
      menusCongig: {
        headingColor: 'text.primary',
        childrenColor: 'text.secondary',
      },
    };
    const content = {
      [LanguageType.english]: {
        ...basics,
        projectName: {
          color: 'primary.main',
          text: 'Project Name',
        },
        copyRights: {
          color: 'text.primary',
          text: 'copy rights copy rights',
        },
      },
      [LanguageType.arabic]: {
        ...basics,
        projectName: {
          color: 'primary.main',
          text: 'اسم المشروع',
        },
        copyRights: {
          color: 'text.primary',
          text: 'جميع الحقوق محفوظة',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
