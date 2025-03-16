import { UserPreferences } from 'src/features/users/entities';

export class EnhanceTextDto {
  text: string;
  userId: string;
  userPreferences?: UserPreferences;
}
