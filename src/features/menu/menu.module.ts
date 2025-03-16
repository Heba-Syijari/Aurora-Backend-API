import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { MenuService } from './menu.service';
import { MenuResolver } from './menu.resolver';

@Module({
  imports: [DatasourceModule],
  providers: [MenuResolver, MenuService],
})
export class MenuModule {}
