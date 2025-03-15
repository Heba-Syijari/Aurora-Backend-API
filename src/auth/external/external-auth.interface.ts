import { UserRoleType } from 'src/types';

export type AuthCredentials = {
  email: string;
  password: string;
};

export type ChangePasswordInput = {
  email: string;
  newPassword: string;
  oldPassword?: string;
};

export type ExternalAuthUser = {
  id: string;
  email: string;
  token?: string;
  verified?: boolean;
  role: UserRoleType;
};

export interface IExtrnalAuthService {
  verifyJWT(token: string): Promise<ExternalAuthUser>;

  login(credentials: AuthCredentials): Promise<ExternalAuthUser>;

  register(
    credentials: AuthCredentials,
    role: UserRoleType,
    id?: string,
  ): Promise<ExternalAuthUser>;

  getUserById(id: string): Promise<ExternalAuthUser>;

  deleteUser(id: string): Promise<boolean>;

  changePassword(input: ChangePasswordInput): Promise<boolean>;

  markUserAsVerified(id: string): Promise<ExternalAuthUser>;

  loginWithGoogle(jwtToken: string): Promise<ExternalAuthUser>;
}

export const IExtrnalAuthService = Symbol('IExtrnalAuthService');
