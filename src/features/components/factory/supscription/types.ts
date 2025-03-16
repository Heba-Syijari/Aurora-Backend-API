import { ButtonData } from '../../types';

export enum SupscriptionVariation {
  SUBSCRIPTION_ONE = 'SUBSCRIPTION_ONE',
  SUBSCRIPTION_TWO = 'SUBSCRIPTION_TWO',
  SUBSCRIPTION_THREE = 'SUBSCRIPTION_THREE',
  SUBSCRIPTION_FOUR = 'SUBSCRIPTION_FOUR',
  SUBSCRIPTION_FIVE = 'SUBSCRIPTION_FIVE',
  SUBSCRIPTION_SIX = 'SUBSCRIPTION_SIX',
}
export type Config = {
  titleTextColor: string;
  subtitleTextColor?: string;
  iconColor?: string;
  descriptionTextColor?: string;
  priceTextColor: string;
  periodTextColor: string;
  featuresTextColor: string;
  subscriptions: {
    subtitle?: string;
    title: string;
    price: string;
    period: string;
    features: string[];
    icon?: string;
    description?: string;
    button: ButtonData;
  }[];
};
export type ISupscriptionVariation = `${SupscriptionVariation}`;
