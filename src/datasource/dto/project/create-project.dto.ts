import { CreateProjectInput } from 'src/features/project/dto/create-project';

export class CreateProjectDto extends CreateProjectInput {
  userId: string;
}
