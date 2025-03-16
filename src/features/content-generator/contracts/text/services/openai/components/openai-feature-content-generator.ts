import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';
import {
  FeatureVariation,
  IFeatureVariation,
} from 'src/features/components/factory/feature/types';
import { BaseContentDto } from 'src/features/content-generator/dto';
import {
  FeatureContent,
  FeatureEightContent,
  FeatureElevenContent,
  FeatureFiveContent,
  FeatureFourContent,
  FeatureNineContent,
  FeatureOneContent,
  FeatureSevenContent,
  FeatureSixContent,
  FeatureTenContent,
  FeatureThirteenContent,
  FeatureThreeContent,
  FeatureTwelveContent,
  FeatureTwoContent,
} from 'src/features/content-generator/types';
import { needExternalServiceResponse } from 'src/utils/record';
import { getOpenaiBasePrompt } from '../common';
import { OpenAIChatCompletionService } from '../openai-chat-completion.service';

export class OpenAIFeatureContentGenerator {
  constructor(
    private readonly chatCompletionService: OpenAIChatCompletionService,
    private readonly model: ChatCompletionCreateParamsBase['model'],
  ) {}

  public async generate(
    dto: BaseContentDto,
    variation: IFeatureVariation,
  ): Promise<FeatureContent> {
    switch (variation) {
      case FeatureVariation.FEATURE_ONE:
        return {
          ...(await this.generateOne(dto)),
        };

      case FeatureVariation.FEATURE_TWO:
        return {
          ...(await this.generateTwo(dto)),
        };

      case FeatureVariation.FEATURE_THREE:
        return {
          ...(await this.generateThree(dto)),
        };

      case FeatureVariation.FEATURE_FOUR:
        return {
          ...(await this.generateFour(dto)),
        };

      case FeatureVariation.FEATURE_FIVE:
        return {
          ...(await this.generateFive(dto)),
        };

      case FeatureVariation.FEATURE_SIX:
        return {
          ...(await this.generateSix(dto)),
        };

      case FeatureVariation.FEATURE_SEVEN:
        return {
          ...(await this.generateSeven(dto)),
        };

      case FeatureVariation.FEATURE_EIGHT:
        return {
          ...(await this.generateEight(dto)),
        };

      case FeatureVariation.FEATURE_NINE:
        return {
          ...(await this.generateNine(dto)),
        };

      case FeatureVariation.FEATURE_TEN:
        return {
          ...(await this.generateTen(dto)),
        };

      case FeatureVariation.FEATURE_ELEVEN:
        return {
          ...(await this.generateEleven(dto)),
        };

      case FeatureVariation.FEATURE_TWELVE:
        return {
          ...(await this.generateTwelve(dto)),
        };

      case FeatureVariation.FEATURE_THIRTEEN:
        return {
          ...(await this.generateThirteen(dto)),
        };
    }
  }

  private async generateOne(dto: BaseContentDto): Promise<FeatureOneContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words main title',
        title1: '5-words subtitle.',
        description1: '22-words description item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
        title4: '5-words item four title.',
        description4: '22-words description item four for features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-One>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-One>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-One>.',
      );

    return result;
  }

  private async generateTwo(dto: BaseContentDto): Promise<FeatureTwoContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words main title',
        servicesTitle: '5-words services title',
        service1: 'Name of the first service',
        service2: 'Name of the second service',
        service3: 'Name of the third service',
        service4: 'Name of the fourth service',
        service5: 'Name of the fifth service',
        title1: '5-words subtitle.',
        description1: '22-words description item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
        title4: '5-words item four title.',
        description4: '22-words description item four for features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-Two>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-Two>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-Two>.',
      );
    return result;
  }

  private async generateThree(
    dto: BaseContentDto,
  ): Promise<FeatureThreeContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words main title',
        subTitle: '5-words subTitle',
        title1: '5-words subtitle.',
        description1: '22-words description item one for features section.',
        image1: 'image description prompt item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        image2: 'image description prompt item Two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
        image3: 'image description prompt item Three for features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-Three>.');

    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-Three>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-Three>.',
      );
    return result;
  }

  private async generateFour(dto: BaseContentDto): Promise<FeatureFourContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words main title',
        title1: '5-words subtitle.',
        description1: '22-words description item one for features section.',
        image1: 'image description prompt item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        image2: 'image description prompt item Two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
        title4: '5-words item four title.',
        description4: '22-words description item four for features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-Four>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-Four>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-Four>.',
      );

    return result;
  }

  private async generateFive(dto: BaseContentDto): Promise<FeatureFiveContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words main title',
        title1: '5-words subtitle.',
        description1: '22-words description item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-Five>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-Five>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-Five>.',
      );

    return result;
  }

  private async generateSix(dto: BaseContentDto): Promise<FeatureSixContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words main title',
        title1: '5-words subtitle.',
        description1: '22-words description item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
        title4: '5-words item four title.',
        description4: '22-words description item four for features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-Six>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-Six>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-Six>.',
      );

    return result;
  }

  private async generateSeven(
    dto: BaseContentDto,
  ): Promise<FeatureSevenContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words main title',
        title1: '5-words subtitle.',
        description1: '22-words description item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
        title4: '5-words item four title.',
        description4: '22-words description item four for features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-Seven>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-Seven>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-Seven>.',
      );

    return result;
  }

  private async generateEight(
    dto: BaseContentDto,
  ): Promise<FeatureEightContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words main title',
        title1: '5-words subtitle.',
        description1: '22-words description item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
        title4: '5-words item four title.',
        description4: '22-words description item four for features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-Eight>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-Eight>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-Eight>.',
      );

    return result;
  }

  private async generateNine(dto: BaseContentDto): Promise<FeatureNineContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words main title',
        title1: '5-words subtitle.',
        description1: '22-words description item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
        title4: '5-words item four title.',
        description4: '22-words description item four for features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-Nine>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-Nine>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-Nine>.',
      );

    return result;
  }

  private async generateTen(dto: BaseContentDto): Promise<FeatureTenContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words main title',
        title1: '5-words subtitle.',
        description1: '22-words description item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
        title4: '5-words item four title.',
        description4: '22-words description item four for features section.',
        image: 'image description prompt features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-Ten>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-Ten>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-Ten>.',
      );

    return result;
  }

  private async generateEleven(
    dto: BaseContentDto,
  ): Promise<FeatureElevenContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: '5-words main title',
        title1: '5-words subtitle.',
        description1: '22-words description item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
        title4: '5-words item four title.',
        description4: '22-words description item four for features section.',
        title5: '5-words item five title.',
        description5: '22-words description item five for features section.',
        title6: '5-words item six title.',
        description6: '22-words description item six for features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-Eleven>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-Eleven>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-Eleven>.',
      );

    return result;
  }

  private async generateTwelve(
    dto: BaseContentDto,
  ): Promise<FeatureTwelveContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        postTitle: '3-words post title',
        title: '5-words main title',
        title1: '5-words subtitle.',
        description1: '22-words description item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
        title4: '5-words item four title.',
        description4: '22-words description item four for features section.',
        title5: '5-words item five title.',
        description5: '22-words description item five for features section.',
        title6: '5-words item six title.',
        description6: '22-words description item six for features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-Twelve>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-Twelve>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-Twelve>.',
      );

    return result;
  }

  private async generateThirteen(
    dto: BaseContentDto,
  ): Promise<FeatureThirteenContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        subtitle: '3-words sub title',
        title: '5-words main title',
        title1: '5-words subtitle.',
        description: '22-words main description for features section.',
        description1: '22-words description item one for features section.',
        title2: '5-words item one title.',
        description2: '22-words description item two for features section.',
        title3: '5-words item two title.',
        description3: '22-words description item three for features section.',
        title4: '5-words item four title.',
        description4: '22-words description item four for features section.',
        title5: '5-words item five title.',
        description5: '22-words description item five for features section.',
        title6: '5-words item six title.',
        description6: '22-words description item six for features section.',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Feature-Thirteen>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Feature-Thirteen>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Feature-Thirteen>.',
      );

    return result;
  }
}
