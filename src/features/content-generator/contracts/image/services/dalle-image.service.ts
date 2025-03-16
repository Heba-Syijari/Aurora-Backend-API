import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ImageGenerateParams } from 'openai/resources';
import { IImageGeneratorContract } from '../image-generator.contract';

@Injectable()
export class DalleImageService implements IImageGeneratorContract {
  private readonly openaiClient: OpenAI;

  constructor(
    private readonly model: ImageGenerateParams['model'],
    configService: ConfigService,
  ) {
    this.openaiClient = new OpenAI({
      apiKey: configService.getOrThrow('OPENAI_API_KEY'),
    });
  }

  async create(query: string) {
    const result = await this.openaiClient.images.generate({
      model: this.model,
      prompt: [
        query,
        "Don't include any Arabic text or any other language text, The image should be without text or letters.",
      ].join('\n'),
      n: 1,
      size: '1024x1024',
    });

    console.log(result.data);

    return result.data[0].url;
  }
}
