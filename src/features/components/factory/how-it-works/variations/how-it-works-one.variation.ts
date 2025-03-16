import { TextData } from 'src/features/components/types';
import { ContentGeneratorService } from 'src/features/content-generator/content-generator.service';
import { WorkContent } from 'src/features/content-generator/types';
import { LanguageType } from 'src/types';
import { Color } from 'src/utils/color';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  title: TextData;

  stages: {
    title: TextData;
    description: TextData;
  }[];
};
export class HowItWorkOneVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'How it works',
          color: 'text.primary',
        },
        stages: [
          {
            title: { text: 'Add a Triggers', color: 'text.primary' },
            description: {
              text: 'Choose an event to kickstart your workflow',
              color: 'text.secondary',
            },
          },
          {
            title: { text: 'Add Actions with Stars', color: 'text.primary' },
            description: {
              text: 'Select from a variety of Stars to define your workflow steps',
              color: 'text.secondary',
            },
          },
          {
            title: { text: 'Test Your Flow', color: 'text.primary' },
            description: {
              text: 'Run a quick test to ensure everything works perfectly',
              color: 'text.secondary',
            },
          },
          {
            title: { text: 'Monitor Runs', color: 'text.primary' },
            description: {
              text: 'Track your workflow’s performance and make improvement',
              color: 'text.secondary',
            },
          },
        ],
      },
      [LanguageType.arabic]: {
        title: {
          text: 'كيف تعمل ؟',
          color: 'text.primary',
        },
        stages: [
          {
            title: { text: 'إضافة محفزات', color: 'text.primary' },
            description: {
              text: 'اختر حدثًا لبدء سير العمل الخاص بك',
              color: 'text.secondary',
            },
          },
          {
            title: {
              text: 'إضافة إجراءات باستخدام النجوم',
              color: 'text.primary',
            },
            description: {
              text: 'اختر من بين مجموعة متنوعة من النجوم لتحديد خطوات سير العمل الخاص بك',
              color: 'text.secondary',
            },
          },
          {
            title: { text: 'اختبار التدفق الخاص بك', color: 'text.primary' },
            description: {
              text: 'قم بإجراء اختبار سريع للتأكد من أن كل شيء يعمل بشكل مثالي',
              color: 'text.secondary',
            },
          },
          {
            title: { text: 'مراقبة التشغيل', color: 'text.primary' },
            description: {
              text: 'تتبع أداء سير العمل الخاص بك وقم بإجراء تحسينات',
              color: 'text.secondary',
            },
          },
        ],
      },
    };
    if (!input.generateAI) return { ...content[input.mainLanguage] };

    // return content use AI
    const contentAi = await this.getContent(input);
    return {
      title: { text: contentAi.title, color: Color.textPrimary },
      stages: [
        {
          title: { text: contentAi.title1, color: Color.textPrimary },
          description: {
            text: contentAi.description1,
            color: Color.textSecondary,
          },
        },
        {
          title: { text: contentAi.title2, color: Color.textPrimary },
          description: {
            text: contentAi.description2,
            color: Color.textSecondary,
          },
        },
        {
          title: { text: contentAi.title2, color: Color.textPrimary },
          description: {
            text: contentAi.description3,
            color: Color.textSecondary,
          },
        },
        {
          title: { text: contentAi.title4, color: Color.textPrimary },
          description: {
            text: contentAi.description4,
            color: Color.textSecondary,
          },
        },
      ],
    };
  }
  private async getContent(input: CreateInput): Promise<WorkContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateWorkContent({
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
      throw new Error('Failed to generate content for WorkOneContent.');
    }
  }
}
