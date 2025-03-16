import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IImageGeneratorContract } from '../image-generator.contract';

// -----------------------------------------

type AiMlApiModel =
  | 'flux/dev'
  | 'flux/schnell'
  | 'flux-pro/v1.1'
  | 'stabilityai/stable-diffusion-xl-base-1.0';

type ApiResponse = {
  created: 0;
  data: Array<{
    b64_json: string;
    revised_prompt: string;
    url: string;
  }>;
};

// -----------------------------------------

@Injectable()
export class AiMlApiImageService implements IImageGeneratorContract {
  private readonly URL = 'https://api.aimlapi.com/images/generations';
  private readonly apiKey: string;

  constructor(
    private readonly model: AiMlApiModel,
    configService: ConfigService,
  ) {
    this.apiKey = configService.get('AIMLAPI_API_KEY');
  }

  async create(prompt: string) {
    const response = await fetch(this.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        prompt: [
          prompt,
          "Don't include any Arabic text or any other language text, The image should be without text or letters.",
        ].join('\n'),
        model: this.model,
        size: '256x256',
        response_format: 'url',
      }),
    });

    console.log({ response });

    if (response.status > 300) {
      throw new Error(response.statusText);
    }

    const data: ApiResponse = await response.json();

    return data.data[0].url;
  }
}
