import { Provider } from '@nestjs/common';
import { IProjectRepository, ProjectRepository } from '../repositories/project';

export const projectRepositoryProvider: Provider = {
  provide: IProjectRepository,
  useClass: ProjectRepository,
};
