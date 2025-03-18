import {
  CreateProjectGenerationDto,
  UpdateProjectGenerationDto,
} from 'src/datasource/dto/project-generation';
import { ProjectGeneration } from 'src/datasource/entities/project-generation.entity';

export interface IProjectGenerationRepository {
  findOne(projectId: string): Promise<ProjectGeneration>;

  create(dto: CreateProjectGenerationDto): Promise<ProjectGeneration>;

  update(dto: UpdateProjectGenerationDto): Promise<ProjectGeneration>;

  delete(projectId: string): Promise<boolean>;
}

export const IProjectGenerationRepository = Symbol(
  'IProjectGenerationRepository',
);
