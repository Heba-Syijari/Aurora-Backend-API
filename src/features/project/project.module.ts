import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CdnModule } from 'src/cdn/cdn.module';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { MailModule } from 'src/mail/mail.module';
import { PluginsModule } from 'src/plugins/plugins.module';
import { StorageModule } from 'src/storage/storage.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { ComponentsModule } from '../components/components.module';
import { PageModule } from '../page/page.module';
import { PostModule } from '../post/post.module';
import { UsersModule } from '../users/users.module';
import { ProjectController } from './project.controller';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { ExportProjectService } from './services/export-project.service';

@Module({
  imports: [
    DatasourceModule,
    ComponentsModule,
    PluginsModule,
    HttpModule,
    MailModule,
    UsersModule,
    StorageModule,
    CdnModule,
    PageModule,
    AnalyticsModule,
    PostModule,
  ],
  providers: [ProjectResolver, ProjectService, ExportProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
