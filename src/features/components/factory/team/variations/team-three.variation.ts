import { TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { Config } from '../types';

type Output = {
  description: TextData;
  title: TextData;
  config: Config;
};

export class TeamThreeVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      nameTextColor: 'text.primary',
      specializationTextColor: 'text.primary',
    };
    const socials = {
      facebook: 'https://facebook.com/#',
      instagram: 'https://instagram.com/#',
      linkedin: 'https://linkedin.com/in/#',
      twitter: 'https://twitter.com/#',
    };
    const content = {
      [LanguageType.english]: {
        title: {
          color: 'text.primary',
          text: 'title',
        },
        description: {
          text: 'description',
          color: 'text.secondary',
        },
        config: {
          ...config,
          team: [
            {
              name: 'Bob Brown',
              specialization: 'QA Engineer',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739373761706.png',
              socials,
            },
            {
              name: 'Sam Doon',
              specialization: 'IT Engineer',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739373902196.webp',
              socials,
            },
            {
              name: 'John Doe',
              specialization: 'Developer',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739374014074.jpeg',
              socials,
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        title: {
          color: 'text.primary',
          text: 'عنوان',
        },
        description: {
          text: 'شرح مبسط هنا',
          color: 'text.secondary',
        },
        config: {
          ...config,
          team: [
            {
              name: 'سالم علي',
              specialization: 'مهندس جودة',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739373761706.png',
              socials,
            },
            {
              name: 'نور محمد',
              specialization: 'مهندس تقني',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739373902196.webp',
              socials,
            },
            {
              name: 'رامي مرجان',
              specialization: 'مطور',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739374014074.jpeg',
              socials,
            },
          ],
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
