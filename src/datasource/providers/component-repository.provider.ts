import { Provider } from '@nestjs/common';
import {
  IComponentRepository,
  ComponentRepository,
} from '../repositories/component';

export const componentRepositoryProvider: Provider = {
  provide: IComponentRepository,
  useClass: ComponentRepository,
};
