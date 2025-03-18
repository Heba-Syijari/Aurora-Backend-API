import { UpdateProjectInput } from 'src/features/project/dto/update-project.input';

export class UpdateProjectDto extends UpdateProjectInput {
  id: string;
  userId: string;
}
