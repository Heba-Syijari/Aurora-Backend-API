import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public, UserDecorator } from 'src/common/decorators';
import { User } from 'src/features/users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthResponse, AuthUser } from './dto/auth.response';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { RequestRecoverPasswordInput } from './dto/request-recover-password.input';
import { ResendVerificationEmailInput } from './dto/resend-verification-email.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { VerifyUserEmailInput } from './dto/verify-user-email.input';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthUser)
  register(@Args('registerInput') input: RegisterInput) {
    return this.authService.register(input);
  }

  @Public()
  @Mutation(() => AuthResponse)
  login(@Args('loginInput') input: LoginInput) {
    return this.authService.login(input);
  }

  @Public()
  @Mutation(() => AuthUser)
  verifyUserEmail(@Args('verifyUserEmailInput') input: VerifyUserEmailInput) {
    return this.authService.verifyVerificationToken(input.token);
  }

  @Public()
  @Mutation(() => AuthUser)
  resendVerificationEmail(
    @Args('resendVerificationEmailInput') input: ResendVerificationEmailInput,
  ) {
    return this.authService.resendVerificationEmail(input.email);
  }

  @Public()
  @Mutation(() => String)
  requestRecoverPassword(
    @Args('requestRecoverPasswordInput') input: RequestRecoverPasswordInput,
  ) {
    return this.authService.requestRecoverPassword(input.email);
  }

  @Public()
  @Mutation(() => Boolean)
  resetPassword(@Args('resetPasswordInput') input: ResetPasswordInput) {
    return this.authService.resetPassword(input);
  }

  @Public()
  @Mutation(() => AuthResponse)
  loginWithGoogle(@Args('token') token: string) {
    return this.authService.loginWithGoogle(token);
  }

  @Query(() => User, { name: 'me' })
  me(@UserDecorator('id') userId: string) {
    return this.authService.me(userId);
  }
}
