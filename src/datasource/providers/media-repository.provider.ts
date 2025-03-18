import { Provider } from '@nestjs/common';
import { IMediaRepository, MediaRepository } from '../repositories/media';

export const mediaRepositoryProvider: Provider = {
  provide: IMediaRepository,
  useClass: MediaRepository,
};
