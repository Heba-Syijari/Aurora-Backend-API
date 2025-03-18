import { ProjectGenerationStatusVariation } from 'src/types';

export class UpdateProjectGenerationDto {
  projectId: string;
  status: ProjectGenerationStatusVariation;
  logs?: string;
  error?: string;
}
