import { IAboutVariation } from 'src/features/components/factory/about/types';
import { IFeatureVariation } from 'src/features/components/factory/feature/types';
import { IHeroVariation } from 'src/features/components/factory/hero/types';
import { IPrivacyPoliceVariation } from 'src/features/components/factory/privacy-policy/types';
import { ITermsAndServiceVariation } from 'src/features/components/factory/terms-and-service/types';
import {
  AboutContentDto,
  BaseContentDto,
  FAQsContentDto,
  HeroContentDto,
  PostsContentDto,
  RegenerateTextDto,
} from '../../dto';
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
} from '../../types';

export interface IContentGeneratorContract {
  generateDomainNames(keyword: string): Promise<string[]>;

  enhanceText(text: string): Promise<string>;

  generateLogoTexts(keyword: string): Promise<string[]>;

  generateText(text: string): Promise<string>;

  regenerateText(dto: RegenerateTextDto): Promise<string>;

  generatePosts(dto: PostsContentDto): Promise<PostsContent>;

  generatePost(dto: PostsContentDto): Promise<PostItem>;

  generateHero(
    dto: HeroContentDto,
    variation: IHeroVariation,
  ): Promise<HeroContent>;

  generateAbout(
    dto: AboutContentDto,
    variation: IAboutVariation,
  ): Promise<AboutContent>;

  generateFAQs(dto: FAQsContentDto): Promise<FAQsContent>;

  generatePrivacyPolicy(
    dto: BaseContentDto,
    variation: IPrivacyPoliceVariation,
  ): Promise<PrivacyPolicyContent>;

  generateTermsAndService(
    dto: BaseContentDto,
    variation: ITermsAndServiceVariation,
  ): Promise<TermsAndServiceContent>;

  generateBlog(dto: BaseContentDto): Promise<BlogContent>;

  generateWork(dto: BaseContentDto): Promise<WorkContent>;

  generateSlider(dto: BaseContentDto): Promise<SliderContent>;

  generateFeature(
    dto: BaseContentDto,
    variation: IFeatureVariation,
  ): Promise<FeatureContent>;
}
export const IContentGeneratorContract = Symbol('IContentGeneratorContract');
