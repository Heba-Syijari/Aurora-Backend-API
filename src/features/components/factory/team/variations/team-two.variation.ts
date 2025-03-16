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

export class TeamTwoVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      nameTextColor: 'text.primary',
      specializationTextColor: 'text.primary',
      bioTextColor: 'text.primary',
      socialIconsColor: 'primary.main',
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
              bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
              socials,
            },
            {
              name: 'Sam Doon',
              specialization: 'IT Engineer',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739373902196.webp',
              bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
              socials,
            },
            {
              name: 'John Doe',
              specialization: 'Developer',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739374014074.jpeg',
              bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
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
              bio: 'أبجد هوز هو مجرد نص وهمية لصناعة الطباعة والتنضيد.',
              socials,
            },
            {
              name: 'نور محمد',
              specialization: 'مهندس تقني',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739373902196.webp',
              bio: 'أبجد هوز هو مجرد نص وهمية لصناعة الطباعة والتنضيد.',
              socials,
            },
            {
              name: 'رامي مرجان',
              specialization: 'مطور',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739374014074.jpeg',
              bio: 'أبجد هوز هو مجرد نص وهمية لصناعة الطباعة والتنضيد.',
              socials,
            },
          ],
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
