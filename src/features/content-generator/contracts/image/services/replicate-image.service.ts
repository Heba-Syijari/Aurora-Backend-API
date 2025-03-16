import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Replicate from 'replicate';
import { IImageGeneratorContract } from '../image-generator.contract';

type ReplicateIdentifier = `${string}/${string}:${string}`;

@Injectable()
export class ReplicateImageService implements IImageGeneratorContract {
  private readonly IMAGE_MODEL: ReplicateIdentifier =
    'ai-forever/kandinsky-2.2:ea1addaab376f4dc227f5368bbd8eff901820fd1cc14ed8cad63b29249e9d463';
  private readonly client: Replicate;

  constructor(configService: ConfigService) {
    this.client = new Replicate({
      auth: configService.get('REPLICATE_API_TOKEN'),
    });
  }

  async create(prompt: string) {
    const output = await this.client.run(this.IMAGE_MODEL, {
      input: {
        prompt: `${prompt}, 4k photo`,
        negative_prompt:
          'arabic text, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, rainbow, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured',
        width: 384,
        height: 384,
      },
    });

    console.log({ output });
    return output[0];
  }
}
