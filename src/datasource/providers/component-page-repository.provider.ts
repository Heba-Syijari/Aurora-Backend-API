import { Provider } from '@nestjs/common';
import {
  IComponentPageRepository,
  ComponentPageRepository,
} from '../repositories/component-page';

export const componentPageRepositoryProvider: Provider = {
  provide: IComponentPageRepository,
  useClass: ComponentPageRepository,
};
