import { UserPreferences } from 'src/features/users/entities';

export class GenerateImageDto {
  prompt: string;
  userId: string;
  userPreferences?: UserPreferences;
}
