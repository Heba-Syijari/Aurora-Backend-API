import { TextData } from 'src/features/components/types';
import { ContentGeneratorService } from 'src/features/content-generator/content-generator.service';
import { FAQsEightContent } from 'src/features/content-generator/types';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  title: TextData;
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

export class FAQsEightVariation implements IComponentVariationFactory {
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
      config: {
        questionTextColor: Color.textPrimary,
        answerTextColor: Color.textSecondary,
        items: content.items,
      },
    };

    return output;
  }

  private async getContent(input: CreateInput): Promise<FAQsEightContent> {
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

  private getDefaultData(language: LanguageTypeVariation): FAQsEightContent {
    const defaultData = {
      [LanguageType.arabic]: {
        title: 'الاسئلة الشائعة',
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
