import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class UploadService {
  constructor(private readonly storageService: StorageService) {}

  async uploadImageFromURL(prefix: string, url: string) {
    const result = await this.storageService.storeImageFromURL(prefix, url);

    return result;
  }

  async uploadImage(prefix: string, image: Express.Multer.File) {
    const result = await this.storageService.storeImage(prefix, image);

    return result;
  }

  async deleteImage(prefix: string, path: string) {
    const result = await this.storageService.deleteFile(path);

    return result;
  }
}
