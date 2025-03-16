import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
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
} from 'src/features/content-generator/dto';
import {
  AboutContent,
  BlogContent,
  FAQsContent,
  FAQsItem,
  FeatureContent,
  HeroContent,
  PostItem,
  PostsContent,
  PrivacyPolicyContent,
  SliderContent,
  TermsAndServiceContent,
  WorkContent,
} from 'src/features/content-generator/types';
import { needExternalServiceResponse } from 'src/utils/record';
import { IContentGeneratorContract } from '../../content-generator.contract';
import { getGroqBasePrompt } from './common';
import {
  GroqAboutContentGenerator,
  GroqHeroContentGenerator,
  GroqPrivacyPolicyGenerator,
} from './components';
import { GroqFeatureContentGenerator } from './components/groq-feature-content-generator';
import { GroqTermsAndServiceGenerator } from './components/groq-service-content-generator';
import {
  GroqChatCompletionService,
  GroqModel,
} from './groq-chat-completion.service';

export class GroqContentGenerator implements IContentGeneratorContract {
  private readonly chatCompletionService: GroqChatCompletionService;
  private readonly heroContentGenerator: GroqHeroContentGenerator;
  private readonly featureContentGenerator: GroqFeatureContentGenerator;
  private readonly aboutContentGenerator: GroqAboutContentGenerator;
  private readonly serviceGenerator: GroqTermsAndServiceGenerator;
  private readonly privacyContentGenerator: GroqPrivacyPolicyGenerator;

  constructor(configService: ConfigService, private readonly model: GroqModel) {
    const groq = new Groq({
      apiKey: configService.getOrThrow('GROQ_API_KEY'),
    });

    this.chatCompletionService = new GroqChatCompletionService(groq);
    this.heroContentGenerator = new GroqHeroContentGenerator(
      this.chatCompletionService,
      this.model,
    );
    this.aboutContentGenerator = new GroqAboutContentGenerator(
      this.chatCompletionService,
      this.model,
    );
    this.featureContentGenerator = new GroqFeatureContentGenerator(
      this.chatCompletionService,
      this.model,
    );
    this.privacyContentGenerator = new GroqPrivacyPolicyGenerator(
      this.chatCompletionService,
      this.model,
    );
    this.serviceGenerator = new GroqTermsAndServiceGenerator(
      this.chatCompletionService,
      this.model,
    );
  }
  public async generatePrivacyPolicy(
    dto: BaseContentDto,
    variation: IPrivacyPoliceVariation,
  ): Promise<PrivacyPolicyContent> {
    return await this.privacyContentGenerator.generate(dto, variation);
  }

  public async generateDomainNames(keyword: string): Promise<string[]> {
    console.log({ keyword });

    const prompt = [
      `Suggest a list of 10 valid domain names for our website using this keyword '${keyword}'.`,
      'Output the results as JSON according to this type {domains: string[]}',
    ].join('\n');

    console.log({ prompt });

    try {
      const message = await this.chatCompletionService.sendMessage(
        prompt,
        this.model,
      );

      console.log({ message });

      const result: { domains: string[] } = JSON.parse(message);

      return result.domains;
    } catch (err) {
      console.log(err);
      throw new Error('error while suggesting domain names');
    }
  }

  public async enhanceText(text: string): Promise<string> {
    console.log({ text });

    const prompt = [`Enhance the following text: '${text}'`].join('\n');

    console.log({ prompt });

    try {
      const message = await this.chatCompletionService.sendMessage(
        prompt,
        this.model,
      );

      console.log({ message });

      return message;
    } catch (err) {
      console.log(err);
      throw new Error('error while enhancing the text');
    }
  }

  public async generateLogoTexts(keyword: string): Promise<string[]> {
    console.log({ keyword });

    const prompt = [
      `Suggest a list of names for our website using this keyword '${keyword}'.`,
      'Output the results as JSON according to this type {names: string[]}',
    ].join('\n');

    try {
      const message = await this.chatCompletionService.sendMessage(
        prompt,
        this.model,
      );

      console.log({ message });

      const result: { names: string[] } = JSON.parse(message);

      return result.names;
    } catch (err) {
      console.log(err);
      throw new Error('error while generating logo texts');
    }
  }

  public async generateText(text: string): Promise<string> {
    console.log({ text });

    const prompt = [`Generate a text using this input text: ${text}`].join(
      '\n',
    );

    try {
      const message = await this.chatCompletionService.sendMessage(
        prompt,
        this.model,
      );

      console.log(message);

      return message;
    } catch (err) {
      console.log(err);
      throw new Error('error while generating the text');
    }
  }

  public async regenerateText(dto: RegenerateTextDto): Promise<string> {
    console.log({ dto });

    const prompt = getGroqBasePrompt({
      dto,
      output: {
        generatedText: `A ${dto.itemType} for ${dto.sectionType} section.`,
      },
    });

    console.log({ prompt });

    try {
      const message = await this.chatCompletionService.sendMessage(
        prompt,
        this.model,
      );

      console.log({ message });

      const { generatedText } = JSON.parse(message) || {
        generatedText: 'Dummy generated text',
      };

      return generatedText;
    } catch (err) {
      console.log(err);
      throw new Error('error while generating the text');
    }
  }

  public async generatePosts(dto: PostsContentDto): Promise<PostsContent> {
    console.log({ dto });

    const prompt = getGroqBasePrompt({
      dto,
      output: {
        posts: {
          'posts type': 'javascript list',
          'posts number': 3,
          'post format': {
            title: '6-words title',
            description: '24-words description',
            body: '200-words body',
            image: 'image description prompt',
          },
        },
      },
    });

    console.log({ prompt });

    const message = await this.chatCompletionService.sendMessage(
      prompt,
      this.model,
    );

    console.log({ message });

    let result: { posts: PostItem[] } = { posts: [] };

    try {
      result = JSON.parse(message);

      result.posts = result.posts.map((post) => {
        const imageAltKey = Object.keys(post).find((key) =>
          key.toLowerCase().includes('image'),
        );

        return {
          title: post.title,
          description: post.description,
          body: post.body,
          imageAlt: post[imageAltKey],
          image: '',
        };
      });
    } catch (err) {
      console.log(err, 'error in parsing posts content as json');
    }

    return { items: result.posts };
  }

  public async generatePost(dto: PostsContentDto): Promise<PostItem> {
    const prompt = getGroqBasePrompt({
      dto,
      task: 'Generate a blog post for the website.',
      output: {
        title: '6-words title',
        description: '24-words description',
        body: '200-words body',
        image: 'image description prompt',
      },
    });

    console.log({ prompt });

    const message = await this.chatCompletionService.sendMessage(
      prompt,
      this.model,
    );

    console.log({ message });

    try {
      const results: Record<string, any> = JSON.parse(message);

      const imageAltKey = Object.keys(results).find((key) =>
        key.toLowerCase().includes('image'),
      );

      const post: PostItem = {
        title: results.title,
        description: results.description,
        body: results.body,
        imageAlt: results[imageAltKey],
        image: '',
      };

      return post;
    } catch (err) {
      console.log(err);
      throw new Error('error while generating a post');
    }
  }

  public async generateBlog(dto: PostsContentDto): Promise<BlogContent> {
    const prompt = getGroqBasePrompt({
      dto,
      task: 'Generate a content for blog section in website.',
      output: {
        title: '6-words title',
        description: '24-words description',
      },
    });
    if (!prompt) throw new Error('Failed to get the prompt  <groq> : <Blog>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <groq> : <Blog>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error('Failed to parse the response as JSON <groq> : <Blog>.');
    return result;
  }

  public async generateHero(
    dto: HeroContentDto,
    variation: IHeroVariation,
  ): Promise<HeroContent> {
    return await this.heroContentGenerator.generate(dto, variation);
  }

  public async generateAbout(
    dto: AboutContentDto,
    variation: IAboutVariation,
  ): Promise<AboutContent> {
    return await this.aboutContentGenerator.generate(dto, variation);
  }

  public async generateFeature(
    dto: BaseContentDto,
    variation: IFeatureVariation,
  ): Promise<FeatureContent> {
    return await this.featureContentGenerator.generate(dto, variation);
  }

  public async generateFAQs(dto: FAQsContentDto): Promise<FAQsContent> {
    console.log({ dto });

    const prompt = getGroqBasePrompt({
      dto,
      output: {
        content: {
          'content items type': 'javascript list',
          'content items number': 6,
          'content item format': {
            question:
              'A question about the topic that is potentially frequently asked by the audience.',
            answer: 'The answer to the question.',
          },
        },
        'output key': 'content',
      },
    });

    console.log({ prompt });

    const message = await this.chatCompletionService.sendMessage(
      prompt,
      this.model,
    );

    console.log({ message });

    let result: { content: FAQsItem[] } = { content: [] };

    try {
      result = JSON.parse(message);

      if (!result?.content) {
        result = { content: [] };
        throw new Error('Invalid result structure');
      }
    } catch (err) {
      console.log(err, 'error in parsing FAQs content as json');
    }

    const content: FAQsContent = {
      title: 'Frequently Asked Questions',
      description:
        'If you have a question or you want to know more about our services, please check below the questions our customers frequently ask us. The answer is usually here. If not, get in touch.',
      items: result.content,
    };

    return content;
  }

  public async generateWork(dto: BaseContentDto): Promise<WorkContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: '5-words main title for <how it works> section.',
        title1: '5-words subtitle for <how it works> section..',
        description1:
          '22-words description item one for <how it works> section.',
        title2: '5-words item one title for <how it works> section..',
        description2:
          '22-words description item two for <how it works> section.',
        title3: '5-words item two title for <how it works> section..',
        description3:
          '22-words description item three for <how it works> section.',
        title4: '5-words item four title for <how it works> section..',
        description4:
          '22-words description item four for <how it works> section.',
      },
    });
    if (!prompt)
      throw new Error(
        'Failed to get the prompt  <Groq> : <<how it works>-One>.',
      );
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <<how it works>-One>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <<how it works>-One>.',
      );

    return result;
  }

  public async generateSlider(dto: BaseContentDto): Promise<SliderContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: '5-words main title for Slider section.',
        title1: 'title item one for Slider section.',
        subtitel1: 'subtitle item one for Slider section.',
        description1: '22-words description item one for Slider section.',
        image1: 'Image description prompt for item one  for Slider section.',
        title2: 'title item two for Slider section.',
        description2: '22-words description item two for Slider section.',
        image2: 'Image description prompt for item two for Slider section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Slider-One>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Slider-One>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Slider-One>.',
      );

    return result;
  }
  public async generateTermsAndService(
    dto: BaseContentDto,
    variation: ITermsAndServiceVariation,
  ): Promise<TermsAndServiceContent> {
    return await this.serviceGenerator.generate(dto, variation);
  }
}
