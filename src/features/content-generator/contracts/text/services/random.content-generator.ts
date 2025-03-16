import { Injectable } from '@nestjs/common';
import {
  AboutVariation,
  IAboutVariation,
} from 'src/features/components/factory/about/types';
import { IFeatureVariation } from 'src/features/components/factory/feature/types';
import {
  HeroVariation,
  IHeroVariation,
} from 'src/features/components/factory/hero/types';
import { IPrivacyPoliceVariation } from 'src/features/components/factory/privacy-policy/types';
import { ITermsAndServiceVariation } from 'src/features/components/factory/terms-and-service/types';
import {
  AboutContentDto,
  BaseContentDto,
  HeroContentDto,
} from 'src/features/content-generator/dto';
import {
  AboutContent,
  BlogContent,
  FAQsContent,
  FeatureContent,
  HeroContent,
  PostItem,
  PostsContent,
  PrivacyPolicyContent,
  SliderContent,
  TermsAndServiceContent,
  WorkContent,
} from 'src/features/content-generator/types';
import { IContentGeneratorContract } from '../content-generator.contract';

@Injectable()
export class RandomContentGenerator implements IContentGeneratorContract {
  generatePost(): Promise<PostItem> {
    return Promise.resolve({
      title: 'Post title',
      description: 'Post description',
      body: 'Post body',
      image: 'https://picsum.photos/1220/720',
    });
  }

  regenerateText(): Promise<string> {
    throw new Error('Method not implemented.');
  }

  generatePosts(): Promise<PostsContent> {
    return Promise.resolve({
      items: [
        {
          title: 'Post title 1',
          description: 'Post description',
          body: 'Post body',
          image: 'https://picsum.photos/1220/720?random=1',
        },
        {
          title: 'Post title 2',
          description: 'Post description',
          body: 'Post body',
          image: 'https://picsum.photos/1220/720?random=2',
        },
        {
          title: 'Post title 3',
          description: 'Post description',
          body: 'Post body',
          image: 'https://picsum.photos/1220/720?random=3',
        },
      ],
    });
  }

  generateLogoTexts(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  async generateDomainNames(keyword: string): Promise<string[]> {
    console.log({ keyword });

    return Promise.resolve([
      'islamicfinder.com',
      'islamicity.com',
      'islamicfinder.net',
      'islamicity.net',
      'islamicfinder.org',
      'islamicity.org',
      'islamicfinder.io',
      'islamicity.io',
    ]);
  }

  async enhanceText(text: string): Promise<string> {
    console.log({ text });

    const items = [
      'some generated text is here',
      'another generated text is here',
      'some generated text must be here',
      'how are you?',
    ];

    const index = ~~(Math.random() * (items.length - 1));

    return Promise.resolve(items[index]);
  }

  async generateText(text: string): Promise<string> {
    console.log({ text });

    const items = [
      'some generated text is here',
      'another generated text is here',
      'some generated text must be here',
      'how are you?',
    ];

    const index = ~~(Math.random() * (items.length - 1));

    return Promise.resolve(items[index]);
  }

  async generateHero(
    dto: HeroContentDto,
    variation: IHeroVariation,
  ): Promise<HeroContent> {
    console.log({ dto });
    switch (variation) {
      case 'HERO_ONE':
        return Promise.resolve({
          kind: HeroVariation.HERO_ONE,
          title: 'Getting ready to design',
          description:
            "After research, the designer must make sense of the data they've collected",
          image: 'https://picsum.photos/1200/720?random=1',
        });
      case 'HERO_TWO':
        return Promise.resolve({
          kind: HeroVariation.HERO_TWO,
          title: 'Discover Islam a path to peace',
          description:
            'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia.',
        });
      case 'HERO_THREE':
        return Promise.resolve({
          kind: HeroVariation.HERO_THREE,
          title: 'Explore the Essence of Islam',
          description:
            'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia.',
        });
      case 'HERO_FOUR':
        return Promise.resolve({
          kind: HeroVariation.HERO_FOUR,
          title: 'Explore the Essence of Islam',
          description:
            'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia.',
          image: 'https://picsum.photos/1200/720?random=31',
        });
      case 'HERO_FIVE':
        return Promise.resolve({
          kind: HeroVariation.HERO_FIVE,
          tagline: 'Tagline',
          title: 'Explore the Essence of Islam',
          description:
            'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia.',
          image: 'https://picsum.photos/1200/720?random=31',
        });
    }
  }

  async generateFAQs(): Promise<FAQsContent> {
    return Promise.resolve({
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
    });
  }

  async generateAbout(
    dto: AboutContentDto,
    variation: IAboutVariation,
  ): Promise<AboutContent> {
    switch (variation) {
      case 'ABOUT_ONE':
        return Promise.resolve({
          kind: AboutVariation.ABOUT_ONE,
          title: 'About',
          subtitle: 'Sub Title',
          description:
            'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        });
      case 'ABOUT_TWO':
        return Promise.resolve({
          kind: AboutVariation.ABOUT_TWO,
          title: 'About',
          subtitle: 'Subtitle',
          description:
            'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
          image: 'https://picsum.photos/300/300',
        });
      case 'ABOUT_THREE':
        return Promise.resolve({
          kind: AboutVariation.ABOUT_THREE,
          title: 'About',
          description:
            'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
          image: 'https://picsum.photos/300/300',
        });
    }
  }
  async generateFeature(
    dto: BaseContentDto,
    variation: IFeatureVariation,
  ): Promise<FeatureContent> {
    return;
  }
  generateWork(dto: BaseContentDto): Promise<WorkContent> {
    return;
  }
  generateSlider(dto: BaseContentDto): Promise<SliderContent> {
    return;
  }
  generatePrivacyPolicy(
    dto: BaseContentDto,
    variation: IPrivacyPoliceVariation,
  ): Promise<PrivacyPolicyContent> {
    return;
  }
  generateTermsAndService(
    dto: BaseContentDto,
    variation: ITermsAndServiceVariation,
  ): Promise<TermsAndServiceContent> {
    return;
  }

  async generateBlog(dto: BaseContentDto): Promise<BlogContent> {
    return {
      title: 'Canva Blocks',
      description:
        'Our blog is your go-to source for valuable insights and thought leadership.',
    };
  }
}
