import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';
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
import { getOpenaiBasePrompt } from '../common';
import { OpenAIChatCompletionService } from '../openai-chat-completion.service';

export class OpenAIHeroContentGenerator {
  constructor(
    private readonly chatCompletionService: OpenAIChatCompletionService,
    private readonly model: ChatCompletionCreateParamsBase['model'],
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
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Hero-One>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Hero-One>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Hero-One>.',
      );

    return result;
  }

  private async generateTwo(dto: HeroContentDto): Promise<HeroTwoContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Hero-Two>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Hero-Two>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Hero-Two>.',
      );
    return result;
  }

  private async generateThree(dto: HeroContentDto): Promise<HeroThreeContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Hero-Three>.');

    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Hero-Three>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Hero-Three>.',
      );
    return result;
  }

  private async generateFour(dto: HeroContentDto): Promise<HeroFourContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Hero-Four>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Hero-Four>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Hero-Four>.',
      );

    return result;
  }

  private async generateFive(dto: HeroContentDto): Promise<HeroFiveContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        tagline: '1-word tagline',
        title: '5-words title',
        description: '24-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Hero-Five>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Hero-Five>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Hero-Five>.',
      );

    return result;
  }

  private async generateSix(dto: HeroContentDto): Promise<HeroSixContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Hero-Six>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Hero-Six>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Hero-Six>.',
      );

    return result;
  }

  private async generateSeven(dto: HeroContentDto): Promise<HeroSevenContent> {
    const prompt = getOpenaiBasePrompt({
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
      throw new Error('Failed to get the prompt  <OpenAI> : <Hero-Seven>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Hero-Seven>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Hero-Seven>.',
      );

    return result;
  }

  private async generateEight(dto: HeroContentDto): Promise<HeroEightContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Hero-Eight>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Hero-Eight>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Hero-Eight>.',
      );

    return result;
  }

  private async generateNine(dto: HeroContentDto): Promise<HeroNineContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words title',
        description: '24-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Hero-Nine>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Hero-Nine>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Hero-Nine>.',
      );

    return result;
  }

  private async generateTen(dto: HeroContentDto): Promise<HeroTenContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words title',
        tagline: '1-word tagline',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Hero-Ten>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Hero-Ten>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Hero-Ten>.',
      );

    return result;
  }

  private async generateEleven(
    dto: HeroContentDto,
  ): Promise<HeroElevenContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words title',
        backgroundImage: 'backgroundImage description prompt',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Hero-Eleven>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Hero-Eleven>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Hero-Eleven>.',
      );

    return result;
  }
}
