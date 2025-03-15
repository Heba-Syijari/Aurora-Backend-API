import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import {
  DeleteInput,
  DeleteOutput,
  IStorageService,
  UploadInput,
  UploadOutput,
} from './istorage-service.interface';

@Injectable()
export class BunnyStorageService implements IStorageService {
  private readonly storageURL: string;
  private readonly publicURL: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.storageURL = configService.get('BUNNY_STORAGE_URL');
    this.publicURL = configService.get('BUNNY_CDN_URL');
    this.initHttpService(configService.get('BUNNY_STORAGE_ACCESS_KEY'));
  }

  getFileURL(path: string): string {
    return [this.storageURL, path].join('/');
  }

  async uploadFile(input: UploadInput): Promise<UploadOutput> {
    const fileURL = this.getFileURL(input.path);

    const headers = {
      'content-type': 'application/octet-stream',
    };
    const { data } = await firstValueFrom(
      this.httpService
        .put(fileURL, input.file, {
          headers,
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.message);
            throw 'An error occured while uploading the file';
          }),
        ),
    );

    const response: UploadOutput = {
      ...data,
      filePath: input.path,
      fileURL: this.getFilePublicURL(input.path),
    };

    return response;
  }

  async deleteFile(input: DeleteInput): Promise<DeleteOutput> {
    const fileURL = this.getFileURL(input.path);

    const { data } = await firstValueFrom(
      this.httpService.delete(fileURL).pipe(
        catchError((error: AxiosError) => {
          console.log(error.message);
          throw 'An error occured while deleting the file';
        }),
      ),
    );

    const response: DeleteOutput = data;

    return response;
  }

  private initHttpService(accessKey: string) {
    this.httpService.axiosRef.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers['accessKey'] = accessKey;
        return config;
      },
    );
  }

  getFilePublicURL(path: string): string {
    return [this.publicURL, path].join('/');
  }
}
