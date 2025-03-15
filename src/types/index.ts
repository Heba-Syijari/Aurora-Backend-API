export const gender = ['MALE', 'FEMALE'] as const;

export type Gender = (typeof gender)[number];

export const intellectualPropertyTypes = [
  'GENERAL',
  'PERSONAL',
  'ORGANIZATIONAL',
] as const;

export type IntellectualPropertyType =
  (typeof intellectualPropertyTypes)[number];

export const presentationVolumes = [
  'SIMPLE',
  'BALANCED',
  'COMPLICATED',
] as const;

export type PresentationVolumesType = (typeof presentationVolumes)[number];

export const visualTypeVariation = ['TEXT', 'VIDEO', 'AUDIO', 'IMAGE'] as const;

export type VisualTypeVariation = (typeof visualTypeVariation)[number];

export const mediaVariation = ['VIDEO', 'AUDIO', 'IMAGE'] as const;

export type MediaVariation = (typeof mediaVariation)[number];

export enum ProjectType {
  STATIC = 'STATIC',
  DYNAMIC = 'DYNAMIC',
}
export type ProjectTypeVariation = `${ProjectType}`;

export enum LanguageType {
  english = 'english',
  arabic = 'arabic',
}

export type LanguageTypeVariation = `${LanguageType}`;

export enum ProjectGenerationStatus {
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type ProjectGenerationStatusVariation = `${ProjectGenerationStatus}`;
