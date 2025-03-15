import {
  HttpException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { User } from 'src/features/users/entities/user.entity';
import { UsersService } from 'src/features/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { generateRandomDigits, hashString } from 'src/utils/strings';
import { AuthResponse, AuthUser } from './dto/auth.response';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { IExtrnalAuthService } from './external/external-auth.interface';
import { JWTService } from './services/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IExtrnalAuthService)
    private readonly externalAuthService: IExtrnalAuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JWTService,
    private readonly mailService: MailService,
  ) {}

  async register(input: RegisterInput): Promise<AuthUser> {
    const authUser = await this.externalAuthService.register(
      { email: input.email, password: input.password },
      Role.USER,
    );
    const user = await this.usersService.create({
      id: authUser.id,
      name: input.name,
      email: input.email,
      gender: input.gender,
      phoneNumber: input.phoneNumber,
      imagePath: input.imagePath,
    });

    // I'm not using 'await' keyword because I don't want to wait the request
    this.sendEmailVerification(user);

    return { ...user, role: authUser.role };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const authUser = await this.externalAuthService.login({
      email: loginInput.email,
      password: loginInput.password,
    });

    if (!authUser.verified) {
      throw new UnprocessableEntityException('Email is not verified');
    }

    return { token: authUser.token, user: authUser };
  }

  async me(id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  async verifyToken(token: string): Promise<AuthUser> {
    return await this.externalAuthService.verifyJWT(token);
  }

  private async generateVerificationToken(
    userId: string,
    payload?: Record<string, string>,
  ): Promise<string> {
    const token = await this.jwtService.sign(userId, payload);

    return token;
  }

  async verifyVerificationToken(token: string): Promise<AuthUser> {
    try {
      const payload = await this.jwtService.verify(token);

      if (!payload) {
        return null;
      }

      const { sub: userId } = payload;

      await this.externalAuthService.markUserAsVerified(userId);

      const user = await this.usersService.update(userId, { verified: true });

      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async resendVerificationEmail(userEmail: string): Promise<AuthUser> {
    const user = await this.usersService.findByEmail(userEmail);

    await this.sendEmailVerification(user);

    return user;
  }

  private async sendEmailVerification(user: {
    id: string;
    name: string;
    email: string;
  }) {
    try {
      const token = await this.generateVerificationToken(user.id);
      await this.mailService.sendRegisterVerification(user, token);
    } catch (err) {
      console.log('error while sending verification email', err);
    }
  }

  async requestRecoverPassword(userEmail: string): Promise<string> {
    const user = await this.usersService.findByEmail(userEmail);

    return await this.sendEmailRecoverPassword(user);
  }

  private async sendEmailRecoverPassword(user: {
    id: string;
    name: string;
    email: string;
  }) {
    try {
      const code = generateRandomDigits(6);
      const hashedCode = hashString(code);

      const token = await this.generateVerificationToken(user.id, {
        email: user.email,
        code: hashedCode,
      });

      this.mailService.sendResetPasswordVerificationCode(user, code);

      return token;
    } catch (err) {
      console.log('error while sending reset password verification code', err);
    }
  }

  async resetPassword(input: ResetPasswordInput): Promise<boolean> {
    try {
      const payload = await this.jwtService.verify(input.token);

      const { code, email } = payload;

      const hashedCode = hashString(input.code);

      console.log({ hashedCode, code, equal: hashedCode === code });

      if (hashedCode !== code) {
        throw new UnprocessableEntityException(`Invalid code [${input.code}]`);
      }

      if (input.email !== email) {
        throw new UnprocessableEntityException(
          `Invalid email [${input.email}]`,
        );
      }

      await this.externalAuthService.changePassword({
        email,
        newPassword: input.password,
      });

      return true;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new UnprocessableEntityException('The code is invalid or expired!');
    }
  }

  async loginWithGoogle(token: string): Promise<AuthResponse> {
    const authUser = await this.externalAuthService.loginWithGoogle(token);

    try {
      const user = await this.usersService.findById(authUser.id);
      await this.usersService.update(user.id, { verified: true });
    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        await this.createUserFromGoogle(token, authUser.id);
      }
    }

    return { token: authUser.token, user: authUser };
  }

  private async createUserFromGoogle(
    token: string,
    userId: string,
  ): Promise<AuthUser> {
    const userInfo: { name: string; email: string; picture: string } =
      this.jwtService.decode(token);

    return await this.usersService.create({
      id: userId,
      email: userInfo.email,
      name: userInfo.name,
      gender: 'MALE',
      imagePath: userInfo.picture,
      phoneNumber: '',
    });
  }
}
