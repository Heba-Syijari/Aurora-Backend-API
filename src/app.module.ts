import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './auth/auth.module';
import { CdnModule } from './cdn/cdn.module';
import { AuthGuard, PermissionsGuard, RolesGuard } from './common/guards';
import { DatasourceModule } from './datasource/datasource.module';
import { AnalyticsModule } from './features/analytics/analytics.module';
import { BlogModule } from './features/blog/blog.module';
import { ComponentsModule } from './features/components/components.module';
import { ContactMessageModule } from './features/contact-message/contact-message.module';
import { ContactRequestModule } from './features/contact-request/contact-request.module';
import { ContentGeneratorModule } from './features/content-generator/content-generator.module';
import { DomainsModule } from './features/domains/domains.module';
import { MediaModule } from './features/media/media.module';
import { MenuModule } from './features/menu/menu.module';
import { PageModule } from './features/page/page.module';
import { PaletteModule } from './features/palette/palette.module';
import { PlanModule } from './features/plan/plan.module';
import { PostModule } from './features/post/post.module';
import { ProjectModule } from './features/project/project.module';
import { StatisticsModule } from './features/statistics/statistics.module';
import { UserModule } from './features/user/user.module';
import { UsersModule } from './features/users/users.module';
import { GraphQLModule } from './graphql/graphql.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { StorageModule } from './storage/storage.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GraphQLModule,
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    UserModule,
    ProjectModule,
    ContentGeneratorModule,
    DatasourceModule,
    PageModule,
    PaletteModule,
    ComponentsModule,
    UploadModule,
    StorageModule,
    PostModule,
    MailModule,
    PlanModule,
    ContactRequestModule,
    ContactMessageModule,
    CdnModule,
    MenuModule,
    MediaModule,
    AnalyticsModule,
    StatisticsModule,
    DomainsModule,
    BlogModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard },
  ],
})
export class AppModule {}
