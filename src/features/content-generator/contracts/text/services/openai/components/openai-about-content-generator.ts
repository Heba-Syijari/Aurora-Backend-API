import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';
import {
  AboutVariation,
  IAboutVariation,
} from 'src/features/components/factory/about/types';
import { AboutContentDto } from 'src/features/content-generator/dto';
import {
  AboutContent,
  AboutFiveContent,
  AboutFourContent,
  AboutOneContent,
  AboutSevenContent,
  AboutSixContent,
  AboutThreeContent,
  AboutTwoContent,
} from 'src/features/content-generator/types';
import { needExternalServiceResponse } from 'src/utils/record';
import { getOpenaiBasePrompt } from '../common';
import { OpenAIChatCompletionService } from '../openai-chat-completion.service';

export class OpenAIAboutContentGenerator {
  constructor(
    private readonly chatCompletionService: OpenAIChatCompletionService,
    private readonly model: ChatCompletionCreateParamsBase['model'],
  ) {}

  public async generate(
    dto: AboutContentDto,
    variation: IAboutVariation,
  ): Promise<AboutContent> {
    switch (variation) {
      case AboutVariation.ABOUT_ONE:
        return {
          ...(await this.generateOne(dto)),
        };

      case AboutVariation.ABOUT_TWO:
        return {
          ...(await this.generateTwo(dto)),
        };

      case AboutVariation.ABOUT_THREE:
        return {
          ...(await this.generateThree(dto)),
        };

      case AboutVariation.ABOUT_FOUR:
        return {
          ...(await this.generateFour(dto)),
        };

      case AboutVariation.ABOUT_FIVE:
        return {
          ...(await this.generateFive(dto)),
        };

      case AboutVariation.ABOUT_SIX:
        return {
          ...(await this.generateSix(dto)),
        };

      case AboutVariation.ABOUT_SEVEN:
        return {
          ...(await this.generateSeven(dto)),
        };
    }
  }

  private async generateOne(dto: AboutContentDto): Promise<AboutOneContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: 'short introduction title',
        subtitle: 'short introduction subtitle',
        description: '30-words description',
      },
    });

    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <About-One>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <About-One>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <About-One>.',
      );

    return result;
  }

  private async generateTwo(dto: AboutContentDto): Promise<AboutTwoContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: 'short introduction title',
        subtitle: 'short introduction subtitle',
        description: '30-words description',
        image: 'image description prompt for abou us section',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <About-Two>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <About-Two>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <About-Two>.',
      );

    return result;
  }

  private async generateThree(
    dto: AboutContentDto,
  ): Promise<AboutThreeContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: 'short introduction title',
        description: '30-words description',
        image: 'image description prompt for abou us section',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <About-Three>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <About-Three>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <About-Three>.',
      );
    return result;
  }

  private async generateFour(dto: AboutContentDto): Promise<AboutFourContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: 'short introduction title',
        subtitle: 'short introduction subtitle',
        description: '30-words description',
        image: 'image description prompt for abou us section',
        cardOneTitle: 'short introduction card one title',
        cardOneDescription: '20-words card one description',
        cardOneImage: 'card one image description prompt',
        cardTwoTitle: 'short introduction card two title',
        cardTwoDescription: '20-words card two description',
        cardTwoImage: 'card one image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <About-Four>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <About-Four>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <About-Four>.',
      );
    return result;
  }

  private async generateFive(dto: AboutContentDto): Promise<AboutFiveContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '4-words title',
        postTitel: '2-words post titel',
        itemtext1: '12-words description',
        itemtext2: '12-words description',
        itemtext3: '12-words description',
        image: 'image description prompt for abou us section',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <About-Five>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <About-Five>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <About-Five>.',
      );
    return result;
  }

  private async generateSix(dto: AboutContentDto): Promise<AboutSixContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        descriptionOne: '12-words description for abou us section',
        descriptionTwo: '12-words description for abou us section',
        descriptionThree: '12-words description for abou us section',
        image: 'image description prompt for abou us section',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <About-Six>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <About-Six>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <About-Six>.',
      );
    return result;
  }

  private async generateSeven(
    dto: AboutContentDto,
  ): Promise<AboutSevenContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        description: '30-words description for abou us section',
        itemtext1: '12-words description for abou us section',
        itemtext2: '12-words description for abou us section',
        itemtext3: '12-words description for abou us section',
        image: 'image description prompt for abou us section',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <About-Seven>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <About-Seven>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <About-Seven>.',
      );
    return result;
  }
}
