import Groq from 'groq-sdk';

export type GroqModel =
  | 'mixtral-8x7b-32768'
  | 'llama2-70b-4096'
  | 'gemma-7b-it';

export class GroqChatCompletionService {
  constructor(private readonly groq: Groq) {}

  async sendMessage(
    content: string,
    model: GroqModel,
    responseFormat: 'text' | 'json_object' = 'json_object',
  ): Promise<string> {
    const chatCompletion = await this.groq.chat.completions.create({
      temperature: 1,
      messages: [{ role: 'system', content }],
      response_format: { type: responseFormat },
      model,
    });

    const message = chatCompletion.choices[0].message;

    return message.content;
  }
}
