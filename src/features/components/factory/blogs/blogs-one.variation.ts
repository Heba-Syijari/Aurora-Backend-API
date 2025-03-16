import { ContentGeneratorService } from 'src/features/content-generator/content-generator.service';
import { BlogContent } from 'src/features/content-generator/types';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import { TextData } from '../../types';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../icomponent-variation.factory';

type Output = {
  title: TextData;
  description: TextData;
  post: {
    titleTextColor: string;
    descriptionTextColor: string;
    itemsCount: number;
    itemsPerRowCount: number;
  };
};

export class BlogsOneVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    if (!input.generateAI) return this.getDefaultData(input.mainLanguage);
    // return content use AI
    const content = await this.getContent(input);
    return {
      title: {
        text: content.title,
        color: Color.textPrimary,
      },
      description: {
        text: content.description,
        color: Color.textSecondary,
      },
      post: {
        titleTextColor: Color.textPrimary,
        descriptionTextColor: Color.textSecondary,
        itemsCount: 4,
        itemsPerRowCount: 2,
      },
    };
  }
  private getDefaultData(language: LanguageTypeVariation): Output {
    const defaultData = {
      [LanguageType.english]: {
        title: {
          text: 'Canva Blocks',
          color: Color.textPrimary,
        },
        description: {
          text: 'Our blog is your go-to source for valuable insights and thought leadership.',
          color: Color.textSecondary,
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'عنوان',
          color: Color.textPrimary,
        },
        description: {
          text: 'مدونتنا هي مصدرك المفضل للحصول على رؤى قيمة وقيادة فكرية.',
          color: Color.textSecondary,
        },
      },
    };

    return {
      ...defaultData[language],
      post: {
        titleTextColor: Color.textPrimary,
        descriptionTextColor: Color.textSecondary,
        itemsCount: 4,
        itemsPerRowCount: 2,
      },
    };
  }
  private async getContent(input: CreateInput): Promise<BlogContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateBlog({
          purpose: input.purpose,
          description: input.description,
          mainLanguage: input.mainLanguage,
          audience: input.audience,
          userId: input.userId,
        });
      } else {
        throw new Error('Purpose and description must be provided.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate content for BlogContent.');
    }
  }
}
