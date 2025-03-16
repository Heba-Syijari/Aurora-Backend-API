import { UserPreferences } from 'src/features/users/entities';

export class SuggestLogoTextsDto {
  keyword: string;
  userId: string;
  userPreferences?: UserPreferences;
}
