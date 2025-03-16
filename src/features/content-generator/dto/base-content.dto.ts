import { UserPreferences } from 'src/features/users/entities';
import { LanguageTypeVariation } from 'src/types';

export class BaseContentDto {
  purpose: string;
  description: string;
  contentCategories?: string[];
  audience: {
    gender: string[];
    age: string[];
  };
  mainLanguage?: LanguageTypeVariation;
  userId: string;
  userPreferences?: UserPreferences;
}
