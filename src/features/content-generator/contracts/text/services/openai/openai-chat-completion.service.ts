import OpenAI from 'openai';
import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

export class OpenAIChatCompletionService {
  constructor(private readonly openaiClient: OpenAI) {}

  async sendMessage(
    content: string,
    model: ChatCompletionCreateParamsBase['model'],
    responseFormat: 'text' | 'json_object' = 'json_object',
  ): Promise<string> {
    const chatCompletion = await this.openaiClient.chat.completions.create({
      model,
      messages: [{ role: 'system', content }],
      ...(model !== 'gpt-4' && { response_format: { type: responseFormat } }),
    });

    const message = chatCompletion.choices[0].message;

    return message.content;
  }
}
