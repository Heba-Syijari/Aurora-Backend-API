import { Provider } from '@nestjs/common';
import { IMenuRepository, MenuRepository } from '../repositories/menu';

export const menuRepositoryProvider: Provider = {
  provide: IMenuRepository,
  useClass: MenuRepository,
};
