import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

import {
  ITermsAndServiceVariation,
  TermsAndServiceVariation,
} from 'src/features/components/factory/terms-and-service/types';
import { BaseContentDto } from 'src/features/content-generator/dto';
import {
  PrivacyPolicyContent,
  PrivacyPolicyFourContent,
  PrivacyPolicyOneContent,
  PrivacyPolicyThreeContent,
  TermsAndServiceFiveContent,
  TermsAndServiceFourContent,
  TermsAndServiceOneContent,
  TermsAndServiceThreeContent,
  TermsAndServiceTwoContent,
} from 'src/features/content-generator/types';
import { needExternalServiceResponse } from 'src/utils/record';
import { getOpenaiBasePrompt } from '../common';
import { OpenAIChatCompletionService } from '../openai-chat-completion.service';

export class OpenAITermsAndServiceGenerator {
  constructor(
    private readonly chatCompletionService: OpenAIChatCompletionService,
    private readonly model: ChatCompletionCreateParamsBase['model'],
  ) {}

  public async generate(
    dto: BaseContentDto,
    variation: ITermsAndServiceVariation,
  ): Promise<PrivacyPolicyContent> {
    switch (variation) {
      case TermsAndServiceVariation.TERMS_AND_SERVICES_ONE:
        return {
          ...(await this.generateOne(dto)),
        };

      case TermsAndServiceVariation.TERMS_AND_SERVICES_TWO:
        return {
          ...(await this.generateTwo(dto)),
        };

      case TermsAndServiceVariation.TERMS_AND_SERVICES_THREE:
        return {
          ...(await this.generateThree(dto)),
        };

      case TermsAndServiceVariation.TERMS_AND_SERVICES_FOUR:
        return {
          ...(await this.generateFour(dto)),
        };
      case TermsAndServiceVariation.TERMS_AND_SERVICES_FIVE:
        return {
          ...(await this.generateFive(dto)),
        };
    }
  }

  private async generateOne(
    dto: BaseContentDto,
  ): Promise<TermsAndServiceOneContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        content: {
          'content items type': 'javascript list',
          'content items number': 6,
          'content item format': {
            titel: 'A question one about Privacy Policy.',
            description: 'The answer to the question.',
          },
        },
        'output key': 'content',
      },
    });

    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Privacy-One>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Privacy-One>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Privacy-One>.',
      );

    const content: PrivacyPolicyOneContent = {
      title: 'Privacy Policy',
      description:
        'Learn about how we handle your data and ensure your privacy is protected. Below are common questions and answers regarding our privacy practices.',
      items: result.content,
    };

    return content;
  }

  private async generateTwo(
    dto: BaseContentDto,
  ): Promise<TermsAndServiceTwoContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        title: 'short introduction title for Privacy Policy section',
        subtitle: 'short introduction subtitle for Privacy Policy section',
        parabraph1: '50-words description about Privacy Policy',
        parabraph2: '50-words description about Privacy Policy',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Privacy-Two>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Privacy-Two>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Privacy-Two>.',
      );

    return result;
  }

  private async generateThree(
    dto: BaseContentDto,
  ): Promise<TermsAndServiceThreeContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        content: {
          'content items type': 'javascript list',
          'content items number': 6,
          'content item format': {
            titel: 'A question one about Privacy Policy.',
            description: 'The answer to the question.',
          },
        },
        'output key': 'content',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Privacy-Three>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Privacy-Three>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Privacy-Three>.',
      );
    const content: PrivacyPolicyThreeContent = {
      title: 'Privacy Policy',
      description:
        'Learn about how we handle your data and ensure your privacy is protected. Below are common questions and answers regarding our privacy practices.',
      items: result.content,
    };

    return content;
  }

  private async generateFour(
    dto: BaseContentDto,
  ): Promise<TermsAndServiceFourContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        content: {
          'content items type': 'javascript list',
          'content items number': 6,
          'content item format': {
            titel: 'A question one about Privacy Policy.',
            description: 'The answer to the question.',
          },
        },
        'output key': 'content',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Privacy-Four>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Privacy-Four>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Privacy-Four>.',
      );
    const content: PrivacyPolicyFourContent = {
      title: 'Privacy Policy',
      description:
        'Learn about how we handle your data and ensure your privacy is protected. Below are common questions and answers regarding our privacy practices.',
      items: result.content,
    };

    return content;
  }
  private async generateFive(
    dto: BaseContentDto,
  ): Promise<TermsAndServiceFiveContent> {
    const prompt = getOpenaiBasePrompt({
      dto,
      output: {
        content: {
          'content items type': 'javascript list',
          'content items number': 6,
          'content item format': {
            titel: 'A question one about Privacy Policy.',
            description: 'The answer to the question.',
          },
        },
        'output key': 'content',
      },
    });
    if (!prompt)
      throw new Error('Failed to get the prompt  <OpenAI> : <Privacy-Five>.');
    const message = needExternalServiceResponse(
      await this.chatCompletionService.sendMessage(prompt, this.model),
      'Failed to fetch data from external service <OpenAI> : <Privacy-Five>.',
    );
    const result = JSON.parse(message);
    if (!result)
      throw new Error(
        'Failed to parse the response as JSON <OpenAI> : <Privacy-Five>.',
      );
    const content: PrivacyPolicyFourContent = {
      title: 'Privacy Policy',
      description:
        'Learn about how we handle your data and ensure your privacy is protected. Below are common questions and answers regarding our privacy practices.',
      items: result.content,
    };

    return content;
  }
}
