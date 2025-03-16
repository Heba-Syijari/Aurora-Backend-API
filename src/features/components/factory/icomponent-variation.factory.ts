import { Media } from 'src/features/media/entities/media.entity';
import { LanguageTypeVariation } from 'src/types';

export type CreateInput = {
  purpose: string;
  description: string;
  contentCategories?: string[];
  generateAI?: boolean;
  audience: {
    gender: string[];
    age: string[];
  };
  mainLanguage: LanguageTypeVariation;
  userId: string;
  media?: Media[];
};

export interface IComponentVariationFactory {
  getData(input: CreateInput): Promise<Record<string, any>>;
}
