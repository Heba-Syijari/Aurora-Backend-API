import { TextData } from '../../types';

export enum ContactVariation {
  CONTACT_ONE = 'CONTACT_ONE',
  CONTACT_TWO = 'CONTACT_TWO',
  CONTACT_THREE = 'CONTACT_THREE',
  CONTACT_FOUR = 'CONTACT_FOUR',
  CONTACT_FIVE = 'CONTACT_FIVE',
  CONTACT_SIX = 'CONTACT_SIX',
  CONTACT_SEVEN = 'CONTACT_SEVEN',
}
export type SocialsConfig = {
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  socialIconsColor: string;
};

export type Address = {
  city: TextData;
  streetAddress: TextData;
};
export type IContactVariation = `${ContactVariation}`;
