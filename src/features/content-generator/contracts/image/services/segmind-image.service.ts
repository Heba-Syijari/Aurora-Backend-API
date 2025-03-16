import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageService } from 'src/storage/storage.service';
import { IImageGeneratorContract } from '../image-generator.contract';

@Injectable()
export class SegmindImageService implements IImageGeneratorContract {
  private readonly URL = 'https://api.segmind.com/v1/sdxl1.0-txt2img';
  private readonly apiKey: string;

  constructor(
    private readonly storageService: StorageService,
    configService: ConfigService,
  ) {
    this.apiKey = configService.get('SEGMIND_API_KEY');
  }

  async create(prompt: string) {
    const image = await this.generate(prompt);

    const { fileURL } = await this.storageService.storeImage('tmp', {
      buffer: Buffer.from(image),
      mimetype: 'image/jpeg',
      size: 0,
      fieldname: 'image',
      originalname: `${Date.now()}.jpg`,
    } as Express.Multer.File);

    return fileURL;
  }

  private async generate(prompt: string): Promise<ArrayBuffer> {
    const response = await fetch(this.URL, {
      method: 'post',
      body: JSON.stringify({
        prompt: prompt,
        negative_prompt:
          'arabic text, text, letters, ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, blurry, bad anatomy, blurred, watermark, signature, cut off',
        style: 'base',
        samples: 1,
        scheduler: 'dpmpp_sde_ancestral',
        num_inference_steps: 25,
        guidance_scale: 8,
        strength: 1,
        seed: ~~(Math.random() * 1e6),
        img_width: 1024,
        img_height: 1024,
        refiner: 'yes',
        base64: false,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'x-api-key': `${this.apiKey}`,
      },
    });

    if (response.status > 300) {
      throw new Error(response.statusText);
    }

    const data = await response.arrayBuffer();

    return data;
  }
}
