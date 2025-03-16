export enum TermsAndServiceVariation {
  TERMS_AND_SERVICES_ONE = 'TERMS_AND_SERVICES_ONE',
  TERMS_AND_SERVICES_TWO = 'TERMS_AND_SERVICES_TWO',
  TERMS_AND_SERVICES_THREE = 'TERMS_AND_SERVICES_THREE',
  TERMS_AND_SERVICES_FOUR = 'TERMS_AND_SERVICES_FOUR',
  TERMS_AND_SERVICES_FIVE = 'TERMS_AND_SERVICES_FIVE',
}
export type Config = {
  titleTextColor: string;
  descriptionTextColor: string;
  items: {
    title: string;
    description: string;
  }[];
};
export type ITermsAndServiceVariation = `${TermsAndServiceVariation}`;
