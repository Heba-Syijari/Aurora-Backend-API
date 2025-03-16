import { UserPreferences } from 'src/features/users/entities';

export class SuggestDomainNamesDto {
  keyword: string;
  userId: string;
  userPreferences?: UserPreferences;
}
