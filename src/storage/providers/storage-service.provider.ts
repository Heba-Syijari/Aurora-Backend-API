import { Provider } from '@nestjs/common';
import { IStorageService, BunnyStorageService } from '../services';

export const storageServiceProvider: Provider = {
  provide: IStorageService,
  useClass: BunnyStorageService,
};
