export enum PrivacyPoliceVariation {
  PRIVACY_POLICY_ONE = 'PRIVACY_POLICY_ONE',
  PRIVACY_POLICY_TWO = 'PRIVACY_POLICY_TWO',
  PRIVACY_POLICY_THREE = 'PRIVACY_POLICY_THREE',
  PRIVACY_POLICY_FOUR = 'PRIVACY_POLICY_FOUR',
}
export type Config = {
  titleTextColor: string;
  descriptionTextColor: string;
  items: {
    title: string;
    description: string;
  }[];
};
export type IPrivacyPoliceVariation = `${PrivacyPoliceVariation}`;
