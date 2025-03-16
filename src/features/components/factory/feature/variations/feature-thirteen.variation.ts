import { TextData } from 'src/features/components/types';
import { ContentGeneratorFeatureService } from 'src/features/content-generator/service/content-generator-feature.service ';
import { FeatureThirteenContent } from 'src/features/content-generator/types';
import { LanguageType } from 'src/types';
import { icons } from 'src/utils/icon';
import { Color } from '../../../../../utils/color';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';
import { Config } from '../types';

type Output = {
  title: TextData;
  subtitle: TextData;
  description: TextData;
  config: Config;
};

export class FeatureThirteenVariation implements IComponentVariationFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorFeatureService,
  ) {}
  async getData(input: CreateInput): Promise<Output> {
    const config = {
      titleTextColor: 'text.primary',
      descriptionTextColor: 'text.secondary',
      iconColor: 'primary.main',
    };
    const content = {
      [LanguageType.english]: {
        title: {
          text: 'Our Features',
          color: 'text.primary',
        },
        subtitle: {
          text: 'Build Flows with a Variety of Stars',
          color: 'text.primary',
        },
        description: {
          text: 'Choose from a wide range of Stars (actions, triggers, and connections) to create powerful workflows tailored to your needs.',
          color: 'text.secondary',
        },
        config: {
          ...config,
          features: [
            {
              title: 'Private integrations',
              description:
                'for government entities Exclusive access to secure and private Stars for seamless integrations with government systems',
              icon: 'mdi:settings-sync-outline',
            },
            {
              title: 'AI-powered assistant',
              description:
                'Utilize NOVA’s built-in AI assistant to guide you through building flows and troubleshooting issues.',
              icon: 'ri:robot-3-line',
            },
            {
              title: 'Multi-user roles & permissions',
              description:
                'Assign roles like Admin or User to manage access and collaboration within your organization',
              icon: 'tabler:user-cog',
            },
            {
              title: 'Interactive Ar/En Interface',
              description:
                'Utilize NOVA’s built-in AI assistant to guide you through building flows and troubleshooting issues.',
              icon: 'bx:world',
            },
            {
              title: 'Real-Time Updates and Collaboration',
              description:
                'Collaborate on workflows with your team and receive updates instantly to keep everyone aligned',
              icon: 'game-icons:puzzle',
            },
          ],
        },
      },
      [LanguageType.arabic]: {
        title: {
          text: 'ميزاتنا',
          color: 'text.primary',
        },
        subtitle: {
          text: 'أنشئ تدفقات مع مجموعة متنوعة من النجوم',
          color: 'text.primary',
        },
        description: {
          text: 'اختر من بين مجموعة واسعة من النجوم (الإجراءات، المحفزات، والاتصالات) لإنشاء سير عمل قوية مصممة خصيصًا لاحتياجاتك.',
          color: 'text.secondary',
        },
        config: {
          ...config,
          features: [
            {
              title: 'تكاملات خاصة',
              description:
                'للكيانات الحكومية وصول حصري إلى نجوم آمنة وخاصة لتحقيق تكامل سلس مع الأنظمة الحكومية',
              icon: 'mdi:settings-sync-outline',
            },
            {
              title: 'مساعد يعمل بالذكاء الاصطناعي',
              description:
                'استخدم المساعد الذكي المدمج في NOVA لإرشادك خلال بناء التدفقات وحل المشكلات.',
              icon: 'ri:robot-3-line',
            },
            {
              title: 'أدوار مستخدمين متعددة والصلاحيات',
              description:
                'قم بتعيين أدوار مثل المدير أو المستخدم لإدارة الوصول والتعاون داخل مؤسستك',
              icon: 'tabler:user-cog',
            },
            {
              title: 'واجهة تفاعلية بالعربية والإنجليزية',
              description:
                'استخدم المساعد الذكي المدمج في NOVA لإرشادك خلال بناء التدفقات وحل المشكلات.',
              icon: 'bx:world',
            },
            {
              title: 'تحديثات فورية والتعاون',
              description:
                'تعاون في سير العمل مع فريقك وتلقى التحديثات على الفور لإبقاء الجميع على نفس الصفحة',
              icon: 'game-icons:puzzle',
            },
          ],
        },
      },
    };
    if (!input.generateAI) return { ...content[input.mainLanguage] };

    // return content use AI
    const contentAi = await this.getContent(input);
    return {
      title: { text: contentAi.title, color: Color.textPrimary },
      subtitle: { text: contentAi.subtitle, color: Color.textPrimary },
      description: { text: contentAi.description, color: Color.textSecondary },
      config: {
        ...config,
        features: [
          {
            title: contentAi.title1,
            description: contentAi.description1,
            icon: icons[Math.floor(Math.random() * 49)].value,
          },
          {
            title: contentAi.title2,
            description: contentAi.description2,
            icon: icons[Math.floor(Math.random() * 49)].value,
          },
          {
            title: contentAi.title3,
            description: contentAi.description3,
            icon: icons[Math.floor(Math.random() * 49)].value,
          },
          {
            title: contentAi.title4,
            description: contentAi.description4,
            icon: icons[Math.floor(Math.random() * 49)].value,
          },
          {
            title: contentAi.title5,
            description: contentAi.description5,
            icon: icons[Math.floor(Math.random() * 49)].value,
          },
          {
            title: contentAi.title6,
            description: contentAi.description6,
            icon: icons[Math.floor(Math.random() * 49)].value,
          },
        ],
      },
    };
  }
  private async getContent(
    input: CreateInput,
  ): Promise<FeatureThirteenContent> {
    try {
      if (input.purpose && input.description) {
        return await this.contentGeneratorService.generateThirteenContent({
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
      throw new Error('Failed to generate content for FeatureThirteenContent.');
    }
  }
}
