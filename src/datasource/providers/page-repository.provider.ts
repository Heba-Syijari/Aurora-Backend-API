import { Provider } from '@nestjs/common';
import { IPageRepository, PageRepository } from '../repositories/page';

export const pageRepositoryProvider: Provider = {
  provide: IPageRepository,
  useClass: PageRepository,
};
