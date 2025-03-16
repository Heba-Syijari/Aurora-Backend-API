import { TextData } from 'src/features/components/types';
import { ContentGeneratorService } from 'src/features/content-generator/content-generator.service';
import { FAQsContent } from 'src/features/content-generator/types';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  title: TextData;
  description: TextData;
  config: {
    questionTextColor: string;
    answerTextColor: string;
    items: OutputItem[];
  };
};

type OutputItem = {
  question: string;
  answer: string;
};

export class FAQsOneVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}

  async getData(input: CreateInput): Promise<Output> {
    const content = !input.generateAI
      ? this.getDefaultData(input.mainLanguage)
      : await this.getContent(input);
    const contentDefault = this.getDefaultData(input.mainLanguage);

    const output: Output = {
      title: { color: Color.textPrimary, text: contentDefault.title },
      description: {
        color: Color.textSecondary,
        text: contentDefault.description,
      },
      config: {
        questionTextColor: Color.textPrimary,
        answerTextColor: Color.textSecondary,
        items: content.items,
      },
    };

    return output;
  }

  private async getContent(input: CreateInput): Promise<FAQsContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateFAQsContent({
          purpose: input.purpose,
          mainLanguage: input.mainLanguage,
          description: input.description,
          audience: input.audience,
          userId: input.userId,
        });
      } else {
        throw new Error('Purpose and description must be provided.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate content for FAQsOneVariation.');
    }
  }

  private getDefaultData(language: LanguageTypeVariation): FAQsContent {
    const defaultData = {
      [LanguageType.arabic]: {
        title: 'الاسئلة الشائعة',
        description:
          'إذا كان لديك سؤال أو كنت ترغب في معرفة المزيد عن خدماتنا، يرجى مراجعة الأسئلة المتكررة التي يطرحها عملاؤنا علينا أدناه. عادةً ما تجد الإجابة هنا. إذا لم يكن الأمر كذلك، فتواصل معنا.',
        items: [
          {
            question: 'كيف اقوم بأ ...... ?',
            answer: 'يتم ذلك كم خلال القيام بما يلي ',
          },
          {
            question: 'كيف اقوم بأ ...... ?',
            answer: 'يتم ذلك كم خلال القيام بما يلي ',
          },
          {
            question: 'كيف اقوم بأ ...... ?',
            answer: 'يتم ذلك كم خلال القيام بما يلي ',
          },
        ],
      },
      [LanguageType.english]: {
        title: 'Frequently Asked Questions',
        description:
          'If you have a question or you want to know more about our services, please check below the questions our customers frequently ask us. The answer is usually here. If not, get in touch.',
        items: [
          {
            question: 'How do I create an online account?',
            answer:
              'Orders are usually shipped within 1-2 business days after placing the order.',
          },
          {
            question: 'How do I create an online account?',
            answer:
              'Orders are usually shipped within 1-2 business days after placing the order.',
          },
          {
            question: 'How do I create an online account?',
            answer:
              'Orders are usually shipped within 1-2 business days after placing the order.',
          },
        ],
      },
    };
    return {
      ...defaultData[language],
    };
  }
}
