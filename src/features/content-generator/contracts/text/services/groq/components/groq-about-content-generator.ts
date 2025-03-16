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
import { getGroqBasePrompt } from '../common';
import {
  GroqChatCompletionService,
  GroqModel,
} from '../groq-chat-completion.service';

export class GroqAboutContentGenerator {
  constructor(
    private readonly chatCompletionService: GroqChatCompletionService,
    private readonly model: GroqModel,
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
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: 'short introduction title',
        subtitle: 'short introduction subtitle',
        description: '30-words description',
      },
    });

    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <About-One>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <About-One>.',
    );

    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <About-One>.',
      );

    return result;
  }

  private async generateTwo(dto: AboutContentDto): Promise<AboutTwoContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: 'short introduction title',
        subtitle: 'short introduction subtitle',
        description: '30-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <About-Two>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <About-Two>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <About-Two>.',
      );
    return result;
  }

  private async generateThree(
    dto: AboutContentDto,
  ): Promise<AboutThreeContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: 'short introduction title',
        subtitle: 'short introduction subtitle',
        description: '30-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <About-Three>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <About-Three>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <About-Three>.',
      );
    return result;
  }

  private async generateFour(dto: AboutContentDto): Promise<AboutFourContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: 'short introduction title',
        subtitle: 'short introduction subtitle',
        description: '30-words description',
        image: 'image description prompt',
        cardOneTitle: 'short introduction card one title',
        cardOneDescription: '20-words card one description',
        cardOneImage: 'card one image description prompt',
        cardTwoTitle: 'short introduction card two title',
        cardTwoDescription: '20-words card two description',
        cardTwoImage: 'card one image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <About-Four>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <About-Four>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <About-Four>.',
      );
    return result;
  }

  private async generateFive(dto: AboutContentDto): Promise<AboutFiveContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        title: '4-words title',
        postTitel: '2-words post titel',
        itemtext1: '12-words description',
        itemtext2: '12-words description',
        itemtext3: '12-words description',
        image: 'image description prompt',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <About-Five>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <About-Five>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <About-Five>.',
      );
    return result;
  }

  private async generateSix(dto: AboutContentDto): Promise<AboutSixContent> {
    const prompt = getGroqBasePrompt({
      dto,
      output: {
        descriptionOne: '12-words description for abou us section',
        descriptionTwo: '12-words description for abou us section',
        descriptionThree: '12-words description for abou us section',
        image: 'image description prompt for abou us section',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <Groq> : <About-Six>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <About-Six>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <About-Six>.',
      );
    return result;
  }
  
  private async generateSeven(
    dto: AboutContentDto,
  ): Promise<AboutSevenContent> {
    const prompt = getGroqBasePrompt({
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
      throw new Error('Failed to get the prompt  <Groq> : <About-Seven>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <Groq> : <About-Seven>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <Groq> : <About-Seven>.',
      );
    return result;
  }
}
