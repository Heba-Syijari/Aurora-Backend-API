import { ImageData, TextData } from 'src/features/components/types';
import { ContentGeneratorAboutService } from 'src/features/content-generator/service/content-generator-about.service ';
import { AboutSixContent } from 'src/features/content-generator/types';
import { StorageService } from 'src/storage';
import { LanguageType, LanguageTypeVariation } from 'src/types';
import { Color } from 'src/utils/color';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  descriptionOne: TextData;
  descriptionTwo: TextData;
  descriptionThree: TextData;
  image: ImageData;
};

export class AboutSixVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorAboutService,
    private readonly storageService: StorageService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    if (!input.generateAI) return this.getDefaultData(input.mainLanguage);
    // return content use AI
    const content = await this.getContent(input);
    const imageURL = await this.storeImage(input.userId, content.image);
    return {
      descriptionOne: {
        text: content.descriptionOne,
        color: Color.textPrimary,
      },
      descriptionTwo: {
        text: content.descriptionTwo,
        color: Color.textPrimary,
      },
      descriptionThree: {
        text: content.descriptionThree,
        color: Color.textPrimary,
      },
      image: { alt: '', url: imageURL },
    };
  }
  private getDefaultData(language: LanguageTypeVariation): Output {
    const content = {
      [LanguageType.english]: {
        descriptionOne: {
          color: 'text.primary',
          text: `for actionable and accessible be should data that believe we is platform Our .xpertise. technical of regardless ,everyone empowering ,forecasting and analysis data simplify to designed data-driven ,smarter make to businesses and individuals .ecisions.`,
        },
        descriptionTwo: {
          color: 'text.primary',
          text: 'With cutting-edge A1 technology, O Plus enables you to: Create stunning, fully customizable dashboards. Generate detailed reports with clear explanations for every chart. Build A1 models to predict trends and uncover insights.',
        },
        descriptionThree: {
          color: 'text.primary',
          text: 'With cutting-edge A1 technology, O Plus enables you to: Create stunning, fully customizable dashboards. Generate detailed reports with clear explanations for every chart. Build A1 models to predict trends and uncover insights.',
        },
        image: {
          alt: 'bg-image-about-six',
          url: 'https://miro.medium.com/v2/resize:fit:1400/1*opn1wt7cJxF3a4KnqHItVw.jpeg',
        },
      },
      [LanguageType.arabic]: {
        descriptionOne: {
          color: 'text.primary',
          text: `للتنفيذ ويمكن الوصول إليها يجب أن تكون البيانات التي تعتقد أننا منصة لدينا .اكسبيرتس. التقنية بغض النظر ، الجميع تمكين والتنبؤ وتحليل البيانات تبسيط لتصميم البيانات المستندة إلى البيانات ، وجعل أكثر ذكاء للشركات والأفراد .إكيسس.`,
        },
        descriptionTwo: {
          color: 'text.primary',
          text: 'للتنفيذ ويمكن الوصول إليها يجب أن تكون البيانات التي تعتقد أننا منصة لدينا .اكسبيرتس. التقنية بغض النظر ، الجميع تمكين والتنبؤ وتحليل البيانات تبسيط لتصميم البيانات المستندة إلى البيانات ، وجعل أكثر ذكاء للشركات والأفراد .إكيسس.',
        },
        descriptionThree: {
          color: 'text.primary',
          text: 'للتنفيذ ويمكن الوصول إليها يجب أن تكون البيانات التي تعتقد أننا منصة لدينا .اكسبيرتس. التقنية بغض النظر ، الجميع تمكين والتنبؤ وتحليل البيانات تبسيط لتصميم البيانات المستندة إلى البيانات ، وجعل أكثر ذكاء للشركات والأفراد .إكيسس.',
        },
        image: {
          alt: 'bg-image-about-six',
          url: 'https://miro.medium.com/v2/resize:fit:1400/1*opn1wt7cJxF3a4KnqHItVw.jpeg',
        },
      },
    };
    return { ...content[language] };
  }

  private async getContent(input: CreateInput): Promise<AboutSixContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateSixContent({
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
      throw new Error('Failed to generate content for generateSixContent.');
    }
  }

  private async storeImage(userId: string, imageURL: string) {
    try {
      const image = await this.storageService.storeImageFromURL(
        userId,
        imageURL,
      );

      return image.fileURL;
    } catch (err) {
      console.log(err);
      return imageURL;
    }
  }
}
