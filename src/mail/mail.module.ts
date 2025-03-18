import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { MailResolver } from './mail.resolver';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          secure: process.env.NODE_ENV === 'production',
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          auth: {
            type: 'login',
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASS'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    DatasourceModule,
  ],
  providers: [MailResolver, MailService],
  exports: [MailService],
})
export class MailModule {}
