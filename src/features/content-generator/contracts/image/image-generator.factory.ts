import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ImageModel } from 'src/common/enums';
import { StorageService } from 'src/storage';
import { IImageGeneratorContract } from './image-generator.contract';
import { DalleImageService, RandomImageService } from './services';
import { ReplicateImageService } from './services/replicate-image.service';
import { SegmindImageService } from './services/segmind-image.service';

@Injectable()
export class ImageGeneratorFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly storageService: StorageService,
  ) {}

  public async create(model?: ImageModel): Promise<IImageGeneratorContract> {
    switch (model) {
      case ImageModel.DALLE_2:
        return new DalleImageService('dall-e-2', this.configService);

      case ImageModel.DALLE_3:
        return new DalleImageService('dall-e-3', this.configService);

      case ImageModel.STABLE_DIFFUSION_XL_1_0:
        return new SegmindImageService(this.storageService, this.configService);
      case ImageModel.KANDINSKY_2_2:
        return new ReplicateImageService(this.configService);

      default:
        return new RandomImageService();
    }
  }
}
