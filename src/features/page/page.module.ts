import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { ComponentsModule } from '../components/components.module';
import { MenuModule } from '../menu/menu.module';
import { PageResolver } from './page.resolver';
import { PageService } from './page.service';

@Module({
  imports: [DatasourceModule, ComponentsModule, MenuModule],
  providers: [PageResolver, PageService],
  exports: [PageService],
})
export class PageModule {}
