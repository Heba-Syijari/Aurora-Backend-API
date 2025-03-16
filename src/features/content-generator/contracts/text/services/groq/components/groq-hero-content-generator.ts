import {
  HeroVariation,
  IHeroVariation,
} from 'src/features/components/factory/hero/types';
import { HeroContentDto } from 'src/features/content-generator/dto';
import {
  HeroContent,
  HeroEightContent,
  HeroElevenContent,
  HeroFiveContent,
  HeroFourContent,
  HeroNineContent,
  HeroOneContent,
  HeroSevenContent,
  HeroSixContent,
  HeroTenContent,
  HeroThreeContent,
  HeroTwoContent,
} from 'src/features/content-generator/types';
import { needExternalServiceResponse } from 'src/utils/record';
import { getGroqBasePrompt } from '../common';
import {
  GroqChatCompletionService,
  GroqModel,
} from '../groq-chat-completion.service';

export class GroqHeroContentGenerator {
  constructor(
    private readonly chatCompletionService: GroqChatCompletionService,
    private readonly model: GroqModel,
  ) {}

  public async generate(
    dto: HeroContentDto,
    variation: IHeroVariation,
  ): Promise<HeroContent> {
    switch (variation) {
      case HeroVariation.HERO_ONE:
        return {
          ...(await this.generateOne(dto)),
        };

      case HeroVariation.HERO_TWO:
        return {
          ...(await this.generateTwo(dto)),
        };

      case HeroVariation.HERO_THREE:
        return {
          ...(await this.generateThree(dto)),
        };

      case HeroVariation.HERO_FOUR:
        return {
          ...(await this.generateFour(dto)),
        };

      case HeroVariation.HERO_FIVE:
        return {
          ...(await this.generateFive(dto)),
        };

      case HeroVariation.HERO_SIX:
        return {
          ...(await this.generateSix(dto)),
        };

      case HeroVariation.HERO_SEVEN:
        return {
          ...(await this.generateSeven(dto)),
        };

      case HeroVariation.HERO_EIGHT:
        return {
          ...(await this.generateEight(dto)),
        };

      case HeroVariation.HERO_NINE:
        return {
          ...(await this.generateNine(dto)),
        };

      case HeroVariation.HERO_TEN:
        return {
          ...(await this.generateTen(dto)),
        };

      case HeroVariation.HERO_ELEVEN:
        return {
          ...(await this.generateEleven(dto)),
        };
    }
  }

  private async generateOne(dto: HeroContentDto): Promise<HeroOneContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <Hero-One>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <Hero-One>.',
    );

    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <Hero-One>.',
      );

    return result;
  }

  private async generateTwo(dto: HeroContentDto): Promise<HeroTwoContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <Hero-Two>.');

    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <Hero-Two>.',
    );

    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <Hero-Two>.',
      );

    return result;
  }

  private async generateThree(dto: HeroContentDto): Promise<HeroThreeContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <Hero-Three>.');

    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <Hero-Three>.',
    );

    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <Hero-Three>.',
      );

    return result;
  }

  private async generateFour(dto: HeroContentDto): Promise<HeroFourContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <Hero-Four>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <Hero-Four>.',
    );

    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <Hero-Four>.',
      );

    return result;
  }

  private async generateFive(dto: HeroContentDto): Promise<HeroFiveContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        tagline: '1-word tagline',
        title: '5-words title',
        description: '24-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <Hero-Five>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <Hero-Five>.',
    );

    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <Hero-Five>.',
      );

    return result;
  }

  private async generateSix(dto: HeroContentDto): Promise<HeroSixContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <Hero-Six>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <Hero-Six>.',
    );

    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <Hero-Six>.',
      );

    return result;
  }

  private async generateSeven(dto: HeroContentDto): Promise<HeroSevenContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        tagline: '1-word tagline',
        title: '5-words title',
        description: '24-words description',
        mainImage: 'main image description prompt',
        backGroundImage: 'backGround image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <Hero-Seven>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <Hero-Seven>.',
    );

    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <Hero-Seven>.',
      );

    return result;
  }

  private async generateEight(dto: HeroContentDto): Promise<HeroEightContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <Hero-Eight>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <Hero-Eight>.',
    );

    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <Hero-Eight>.',
      );

    return result;
  }

  private async generateNine(dto: HeroContentDto): Promise<HeroNineContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <Hero-Nine>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <Hero-Nine>.',
    );

    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <Hero-Nine>.',
      );

    return result;
  }

  private async generateTen(dto: HeroContentDto): Promise<HeroTenContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: '5-words title',
        tagline: '1-word tagline',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <Hero-Ten>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <Hero-Ten>.',
    );

    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <Hero-Ten>.',
      );

    return result;
  }

  private async generateEleven(
    dto: HeroContentDto,
  ): Promise<HeroElevenContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: '5-words title',
        backgroundImage: 'backgroundImage description prompt',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <Hero-Eleven>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <Hero-Eleven>.',
    );

    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <Hero-Eleven>.',
      );

    return result;
  }
}
