export enum FeatureVariation {
  FEATURE_ONE = 'FEATURE_ONE',
  FEATURE_TWO = 'FEATURE_TWO',
  FEATURE_THREE = 'FEATURE_THREE',
  FEATURE_FOUR = 'FEATURE_FOUR',
  FEATURE_FIVE = 'FEATURE_FIVE',
  FEATURE_SIX = 'FEATURE_SIX',
  FEATURE_SEVEN = 'FEATURE_SEVEN',
  FEATURE_EIGHT = 'FEATURE_EIGHT',
  FEATURE_NINE = 'FEATURE_NINE',
  FEATURE_TEN = 'FEATURE_TEN',
  FEATURE_ELEVEN = 'FEATURE_ELEVEN',
  FEATURE_TWELVE = 'FEATURE_TWELVE',
  FEATURE_THIRTEEN = 'FEATURE_THIRTEEN',
}
export type Config = {
  titleTextColor: string;
  descriptionTextColor: string;
  iconColor: string;
  features: {
    title: string;
    description: string;
    icon: string;
    image?: string;
  }[];
};
export type IFeatureVariation = `${FeatureVariation}`;
