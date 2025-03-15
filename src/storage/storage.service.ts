import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import JSZip from 'jszip';
import { IStorageService } from './services';
import {
  createFilePath,
  createImagePath,
  extractImageInfoFromResponse,
} from './utils';

@Injectable()
export class StorageService {
  constructor(
    @Inject(IStorageService)
    private readonly storageService: IStorageService,
  ) {}

  async storeImage(prefix: string, image: Express.Multer.File) {
    const imagePath = createImagePath(prefix, image.originalname);
    try {
      const result = await this.storageService.uploadFile({
        file: image.buffer,
        path: imagePath,
      });

      return result;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message ?? 'Uploading image is failed');
    }
  }

  async storeImageFromURL(prefix: string, imageURL: string) {
    try {
      const response = await fetch(imageURL);

      const image = await extractImageInfoFromResponse(response);

      const result = await this.storeImage(prefix, image);

      return result;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message ?? err);
    }
  }

  async storeFile(prefix: string, file: Express.Multer.File) {
    const filePath = createFilePath(prefix, file.originalname);

    try {
      const result = await this.storageService.uploadFile({
        file: file.buffer,
        path: filePath,
      });

      return result;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message ?? 'Uploading file is failed');
    }
  }

  async storeFileFromBuffer(filePath: string, file: Buffer) {
    try {
      const result = await this.storageService.uploadFile({
        file: file,
        path: filePath,
      });

      return result;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message ?? 'Uploading file is failed');
    }
  }

  async extractZipFileThenStoreInFolder(data: Buffer, folderName: string) {
    try {
      const { files } = await JSZip.loadAsync(data);

      for (const path in files) {
        const file = files[path];
        if (file.dir) continue;

        const buffer = await file.async('nodebuffer');
        await this.storeFileFromBuffer(`${folderName}/${path}`, buffer);
        console.info(`Uploaded: ${path}`);
      }
    } catch (err) {
      console.log(err);
      const msg = err.message ?? 'Uploading folder is failed';
      throw new BadRequestException(msg);
    }
  }

  async deleteFile(path: string) {
    try {
      const result = await this.storageService.deleteFile({ path });

      return result;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err ?? 'Deleting file is failed');
    }
  }

  resolvePath(path: string) {
    return this.storageService.getFilePublicURL(path);
  }
}
