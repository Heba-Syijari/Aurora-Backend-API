import { Injectable } from '@nestjs/common';
import { IImageGeneratorContract } from '../image-generator.contract';

@Injectable()
export class RandomImageService implements IImageGeneratorContract {
  async create(query: string) {
    console.log({ query });

    return `https://picsum.photos/400/200?random=${~~(Math.random() * 1e3)}`;
  }
}
