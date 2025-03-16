import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';
import {
  IPrivacyPoliceVariation,
  PrivacyPoliceVariation,
} from 'src/features/components/factory/privacy-policy/types';
import { BaseContentDto } from 'src/features/content-generator/dto';
import {
  PrivacyPolicyContent,
  PrivacyPolicyFourContent,
  PrivacyPolicyOneContent,
  PrivacyPolicyThreeContent,
  PrivacyPolicyTwoContent,
} from 'src/features/content-generator/types';
import { needExternalServiceResponse } from 'src/utils/record';
import { getOpenaiBasePrompt } from '../common';
import { OpenAIChatCompletionService } from '../openai-chat-completion.service';

export class OpenAIPrivacyPolicyGenerator {
  constructor(
    private readonly chatCompletionService: OpenAIChatCompletionService,
    private readonly model: ChatCompletionCreateParamsBase['model'],
  ) {}

  public async generate(
    dto: BaseContentDto,
    variation: IPrivacyPoliceVariation,
  ): Promise<PrivacyPolicyContent> {
    switch (variation) {
      case PrivacyPoliceVariation.PRIVACY_POLICY_ONE:
        return {
          ...(await this.generateOne(dto)),
        };

      case PrivacyPoliceVariation.PRIVACY_POLICY_TWO:
        return {
          ...(await this.generateTwo(dto)),
        };

      case PrivacyPoliceVariation.PRIVACY_POLICY_THREE:
        return {
          ...(await this.generateThree(dto)),
        };

      case PrivacyPoliceVariation.PRIVACY_POLICY_FOUR:
        return {
          ...(await this.generateFour(dto)),
        };
    }
  }

  private async generateOne(
    dto: BaseContentDto,
  ): Promise<PrivacyPolicyOneContent> {
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
  ): Promise<PrivacyPolicyTwoContent> {
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
  ): Promise<PrivacyPolicyThreeContent> {
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
  ): Promise<PrivacyPolicyFourContent> {
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
}
