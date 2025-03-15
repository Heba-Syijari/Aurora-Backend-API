import FusionAuthClient from '@fusionauth/typescript-client';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRoleType } from 'src/types';
import {
  AuthCredentials,
  ChangePasswordInput,
  ExternalAuthUser,
  IExtrnalAuthService,
} from './external-auth.interface';

@Injectable()
export class FusionAuthService implements IExtrnalAuthService {
  private readonly client: FusionAuthClient;
  private readonly applicationId: string;

  constructor(config: ConfigService) {
    this.client = new FusionAuthClient(
      config.get('FUSIONAUTH_ADMIN_KEY'),
      config.get('FUSIONAUTH_URL'),
      config.get('FUSIONAUTH_TENANT_ID'),
    );

    this.applicationId = config.get('FUSIONAUTH_APP_ID');
  }

  async verifyJWT(token: string): Promise<ExternalAuthUser> {
    try {
      const result = await this.client.validateJWT(token);

      if (!result.wasSuccessful()) {
        throw new BadRequestException('request was not successful');
      }

      const user = {
        id: result.response.jwt?.sub,
        email: result.response.jwt?.email,
        role: result.response.jwt?.roles[0],
      };

      return user;
    } catch (err) {
      console.log({ err });
      // TODO: check from responses to provide proper exceptions
      if (err.exception?.code === 'ERR_SOCKET_CONNECTION_TIMEOUT') {
        throw new BadRequestException('Token verification timeout');
      }
      throw new BadRequestException('error in verifing token');
    }
  }

  async login(credentials: AuthCredentials): Promise<ExternalAuthUser> {
    try {
      const result = await this.client.login({
        loginId: credentials.email,
        password: credentials.password,
        applicationId: this.applicationId,
      });

      if (result.wasSuccessful()) {
        const { user, token } = result.response;
        const role = user.registrations[0].roles[0] as UserRoleType;

        return {
          id: user.id,
          email: user.email,
          verified: user.data.verified,
          token,
          role,
        };
      }

      throw new BadRequestException('Something went wrong');
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      throw new UnauthorizedException('email or password is wrong');
    }
  }

  async register(
    credentials: AuthCredentials,
    role: UserRoleType,
    id?: string,
  ): Promise<ExternalAuthUser> {
    try {
      const result = await this.client.register(id, {
        user: {
          email: credentials.email,
          password: credentials.password,
          data: { verified: false },
        },
        registration: {
          applicationId: this.applicationId,
          roles: [role],
        },
      });

      if (result.wasSuccessful()) {
        const { user, token } = result.response;

        return {
          id: user.id,
          email: user.email,
          verified: user.data.verified,
          token,
          role,
        };
      }
      // TODO: check from responses to provide proper exceptions
      throw new BadRequestException('request was not successful');
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      if (
        err.exception?.fieldErrors?.['user.email']?.[0].code ===
        '[duplicate]user.email'
      ) {
        throw new ConflictException(
          `A User with email [${credentials.email}] already exists`,
        );
      }
    }
  }

  async getUserById(id: string): Promise<ExternalAuthUser> {
    try {
      const result = await this.client.retrieveUser(id);

      if (result.wasSuccessful()) {
        const { user, token } = result.response;
        const role = user.registrations[0].roles[0] as UserRoleType;

        return {
          id: user.id,
          email: user.email,
          verified: user.data.verified,
          token,
          role,
        };
      }

      throw new BadRequestException('request was not successful');
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      // TODO: check if its not found
      throw new BadRequestException('request was not successful');
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await this.client.deleteUser(id);

      return result.wasSuccessful();
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      return false;
    }
  }

  async markUserAsVerified(id: string): Promise<ExternalAuthUser> {
    try {
      const result = await this.client.patchUser(id, {
        applicationId: this.applicationId,
        user: { data: { verified: true } },
      });

      if (result.wasSuccessful()) {
        const { user } = result.response;
        const role = user.registrations[0].roles[0] as UserRoleType;

        return {
          id: user.id,
          email: user.email,
          verified: user.data.verified,
          role,
        };
      }

      throw new BadRequestException('request was not successful');
    } catch (err) {
      console.error(err);
      throw new BadRequestException('request was not successful');
    }
  }

  async changePassword(input: ChangePasswordInput): Promise<boolean> {
    try {
      const result = await this.client.changePasswordByIdentity({
        applicationId: this.applicationId,
        loginId: input.email,
        currentPassword: input.oldPassword,
        password: input.newPassword,
      });

      if (result.wasSuccessful()) {
        return true;
      }

      throw new BadRequestException("error in changing user's password");
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      const message =
        err.exception?.fieldErrors?.currentPassword?.[0]?.message ||
        "error in changing user's password";
      throw new BadRequestException(message);
    }
  }

  async loginWithGoogle(jwtIdToken: string): Promise<ExternalAuthUser> {
    // 1- https://fusionauth.io/docs/v1/tech/identity-providers/google#create-a-google-cloud-account
    // 2- https://fusionauth.io/docs/v1/tech/apis/identity-providers/google#complete-the-google-login

    // For the Google identity provider, this value will always be 82339786-3dff-42a6-aac6-1f1ceecb6c46
    // read more in the second link
    try {
      const result = await this.client.identityProviderLogin({
        applicationId: this.applicationId,
        identityProviderId: '82339786-3dff-42a6-aac6-1f1ceecb6c46',
        data: { token: jwtIdToken },
      });

      if (result.wasSuccessful()) {
        const { token, user } = result.response;

        const verifiedUser = await this.markUserAsVerified(user.id);

        return { ...verifiedUser, token };
      }

      throw new BadRequestException('request was not successful');
    } catch (err) {
      console.log(err);
      console.log(err?.exception?.generalErrors);
      throw new BadRequestException('request was not successful');
    }
  }
}
