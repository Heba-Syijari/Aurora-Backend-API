import { ButtonData, TextData } from 'src/features/components/types';
import { LanguageType } from 'src/types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { Config } from '../types';

type Output = {
  button: ButtonData;
  title: TextData;
  subTitle: TextData;
  description: TextData;
  config: Config;
};
export class TeamOneVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      nameTextColor: 'text.primary',
      specializationTextColor: 'text.primary',
      emailTextColor: 'text.primary',
      numberTextColor: 'text.primary',
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
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'Send',
        },
        title: {
          color: 'text.primary',
          text: 'title',
        },
        subTitle: {
          text: 'subTitle',
          color: 'text.primary',
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
              email: 'bob.brown@example.com',
              number: '444-555-6666',
              socials,
            },
            {
              name: 'Sam Doon',
              specialization: 'IT Engineer',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739373902196.webp',
              email: 'sam.doon@example.com',
              number: '444-555-6666',
              socials,
            },
            {
              name: 'John Doe',
              specialization: 'Developer',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739374014074.jpeg',
              email: 'John.Doe@example.com',
              number: '987-654-3210',
              socials,
            },
            {
              name: 'Jane Smith',
              specialization: 'Designer',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739374069643.jpeg',
              email: 'jane.smith@example.com',
              number: '987-654-3210',
              socials,
            },
            {
              name: 'Alice Johnson',
              specialization: 'Project Manager',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1WJ9CvdL3pLWJo2Pkzpyh9EEq-qk_1ugi8Q&s',
              email: 'alice.johnson@example.com',
              number: '555-123-4567',
              socials,
            },
            {
              name: 'Bob Brown',
              specialization: 'QA Engineer',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgu8cvJBA4GB-KIsh8vcTrOR4lHX40DX0a9w&s',
              email: 'bob.brown@example.com',
              number: '444-555-6666',
              socials,
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        button: {
          backgroundColor: 'primary.main',
          color: 'common.white',
          linkTo: '',
          text: 'ارسال',
        },
        title: {
          color: 'text.primary',
          text: 'عنوان',
        },
        subTitle: {
          text: 'عنوان فرعي',
          color: 'text.primary',
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
              email: 'bob.brown@example.com',
              number: '444-555-6666',
              socials,
            },
            {
              name: 'نور محمد',
              specialization: 'مهندس تقني',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739373902196.webp',
              email: 'sam.doon@example.com',
              number: '444-555-6666',
              socials,
            },
            {
              name: 'رامي مرجان',
              specialization: 'مطور',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739374014074.jpeg',
              email: 'John.Doe@example.com',
              number: '987-654-3210',
              socials,
            },
            {
              name: 'عمر سكر',
              specialization: 'مصمم',
              image:
                'https://canvas-blocks.b-cdn.net/images/team/2025-02/1739374069643.jpeg',
              email: 'jane.smith@example.com',
              number: '987-654-3210',
              socials,
            },
            {
              name: 'لانا حلو',
              specialization: 'مديرة مشروع',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1WJ9CvdL3pLWJo2Pkzpyh9EEq-qk_1ugi8Q&s',
              email: 'alice.johnson@example.com',
              number: '555-123-4567',
              socials,
            },
            {
              name: 'فادي دباس',
              specialization: 'مدير عام',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgu8cvJBA4GB-KIsh8vcTrOR4lHX40DX0a9w&s',
              email: 'bob.brown@example.com',
              number: '444-555-6666',
              socials,
            },
          ],
        },
      },
    };
    return { ...content[input.mainLanguage] };
  }
}
