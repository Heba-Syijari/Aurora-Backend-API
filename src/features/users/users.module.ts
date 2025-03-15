import { Module } from '@nestjs/common';
import { externalAuthServiceProvider } from 'src/auth/providers/external-auth-service.provider';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [DatasourceModule],
  providers: [UsersResolver, UsersService, externalAuthServiceProvider],
  exports: [UsersService],
})
export class UsersModule {}
