import { ProjectGenerationStatusVariation } from 'src/types';

export class ProjectGeneration {
  id: number;
  projectId: string;
  status: ProjectGenerationStatusVariation;
  logs?: string;
  error?: string;
  createdAt: Date;
}
