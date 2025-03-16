import { UserPreferences } from 'src/features/users/entities';

export class GenerateTextDto {
  text: string;
  userId: string;
  userPreferences?: UserPreferences;
}
