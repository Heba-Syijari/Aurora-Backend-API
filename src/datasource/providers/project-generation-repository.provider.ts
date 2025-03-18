import { Provider } from '@nestjs/common';
import {
  IProjectGenerationRepository,
  ProjectGenerationRepository,
} from '../repositories/project-generation';

export const projectGenerationRepositoryProvider: Provider = {
  provide: IProjectGenerationRepository,
  useClass: ProjectGenerationRepository,
};
