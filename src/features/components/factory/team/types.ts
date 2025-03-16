export enum TeamVariation {
  TEAM_ONE = 'TEAM_ONE',
  TEAM_TWO = 'TEAM_TWO',
  TEAM_THREE = 'TEAM_THREE',
  TEAM_FOUR = 'TEAM_FOUR',
}
export type Config = {
  nameTextColor?: string;
  specializationTextColor?: string;
  emailTextColor?: string;
  numberTextColor?: string;
  socialIconsColor?: string;
  bioTextColor?: string;
  team: {
    name: string;
    specialization: string;
    image: string;
    bio?: string;
    email?: string;
    number?: string;
    socials: {
      facebook: string;
      instagram: string;
      linkedin: string;
      twitter: string;
    };
  }[];
};
export type ITeamVariation = `${TeamVariation}`;
