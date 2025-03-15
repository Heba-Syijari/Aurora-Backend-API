import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [AuthModule, DatasourceModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
