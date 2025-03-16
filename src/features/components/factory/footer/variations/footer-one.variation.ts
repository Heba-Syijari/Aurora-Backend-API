import { TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import { SocialsConfig } from '../../contact/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { MenusCongig } from '../types';

type Output = {
  menusCongig: MenusCongig;
  socialsConfig: SocialsConfig;
  copyRights: TextData;
  projectDescription: TextData;
};
export class FooterOneVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const basics = {
      menusCongig: {
        headingColor: 'common.white',
        childrenColor: 'common.white',
      },
      socialsConfig: {
        socials: {
          facebook: 'https://facebook.com/#',
          instagram: 'https://instagram.com/#',
          linkedin: 'https://linkedin.com/in/#',
          twitter: 'https://twitter.com/#',
        },
        socialIconsColor: 'background.neutral',
      },
    };
    const content = {
      [LanguageType.english]: {
        ...basics,
        copyRights: {
          color: 'common.white',
          text: 'copy rights',
        },
        projectDescription: {
          text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantiumdoloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatiset quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatemquia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.',
          color: 'common.white',
        },
      },
      [LanguageType.arabic]: {
        ...basics,
        copyRights: {
          color: 'common.white',
          text: 'حقوق النشر',
        },
        projectDescription: {
          text: 'ومع ذلك ، عندما تدرك مكان هذا الخطأ الساذج ، سيتم محاسبتك بشكوى قذرة ومؤلمة ، وسيفتح كل شيء ، وهو بالضبط من مخترع الحقيقة هذا ، وتقريبا كما لو كان مهندس حياة الشرب قد تم شرحه. لن يغادر أحد السيارة ، لكن أوهايو ستغادر ، لكن هذا ما حدث.',
          color: 'common.white',
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
