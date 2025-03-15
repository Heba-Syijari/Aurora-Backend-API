import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/features/users/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { externalAuthServiceProvider } from './providers/external-auth-service.provider';
import { JWTService } from './services/jwt.service';

@Module({
  imports: [UsersModule, JwtModule],
  providers: [
    AuthResolver,
    AuthService,
    JWTService,
    externalAuthServiceProvider,
  ],
  exports: [AuthService, externalAuthServiceProvider],
})
export class AuthModule {}
