import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TextModel } from 'src/common/enums';
import { IContentGeneratorContract } from './content-generator.contract';
import { OpenAIContentGenerator, RandomContentGenerator } from './services';
import { GroqContentGenerator } from './services/groq';

@Injectable()
export class ContentGeneratorFactory {
  constructor(private readonly configService: ConfigService) {}

  public async create(model?: TextModel): Promise<IContentGeneratorContract> {
    switch (model) {
      case TextModel.GPT_3_5:
        return new OpenAIContentGenerator(this.configService, 'gpt-3.5-turbo');

      case TextModel.GPT_4:
        return new OpenAIContentGenerator(this.configService, 'gpt-4');

      case TextModel.GPT_4o:
        return new OpenAIContentGenerator(this.configService, 'gpt-4o');

      case TextModel.GPT_4o_mini:
        return new OpenAIContentGenerator(this.configService, 'gpt-4o-mini');

      case TextModel.MIXTRAL_8X7B:
        return new GroqContentGenerator(
          this.configService,
          'mixtral-8x7b-32768',
        );

      default:
        return new RandomContentGenerator();
    }
  }
}
