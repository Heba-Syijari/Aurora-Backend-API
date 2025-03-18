import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { IUserRepository } from 'src/datasource/repositories/user';
import { DonationPaymentCompletedEvent } from 'src/payment/events';
import { PAYMENT_EVENTS } from 'src/payment/events/constants';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async sendRegisterVerification(
    user: { name: string; email: string; isAdmin?: boolean },
    token: string,
  ) {
    const url = this.buildFrontendVerificationURL(token, user.isAdmin);

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Canva Blocks! Confirm your Email',
      template: './register-verification',
      context: {
        name: user.name,
        url,
      },
    });

    console.log(`A verification email is sent to [${user.email}]`);
  }

  private buildFrontendVerificationURL(
    token: string,
    isAdmin?: boolean,
  ): string {
    const envVarName = isAdmin
      ? 'ADMIN_VERIFICATION_URL'
      : 'BUILDER_VERIFICATION_URL';

    const frontendVerificationURL = this.config.get(envVarName);

    const url = `${frontendVerificationURL}?token=${token}`;

    return url;
  }

  async sendResetPasswordVerificationCode(
    user: { name: string; email: string },
    code: string,
  ) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Canva Blocks Password Recovery',
      template: './password-recovery',
      context: {
        name: user.name,
        code,
      },
    });

    console.log(`A password recovery email is sent to [${user.email}]`);
  }

  async sendExportedWebsite(
    user: { name: string; email: string },
    fileURL: string,
  ) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Canva Blocks - Export Website',
      template: './export-website',
      context: {
        name: user.name,
        fileURL,
      },
    });

    console.log(`An export website email is sent to [${user.email}]`);
  }

  async sendExportingWebsiteFailed(
    user: { name: string; email: string },
    projectName: string,
  ) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Canva Blocks - Website Exporting Failed',
      template: './website-export-failed',
      context: {
        name: user.name,
        projectName,
      },
    });

    console.log(`An failed export website email is sent to [${user.email}]`);
  }

  async sendWebsitePublished(
    user: { name: string; email: string },
    hostname: string,
    projectName: string,
  ) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Canva Blocks - Publish Website',
      template: './publish-website',
      context: {
        name: user.name,
        hostname,
        projectName,
      },
    });

    console.log(`A publish website email is sent to [${user.email}]`);
  }

  async sendWebsitePublishingFailed(
    user: { name: string; email: string },
    projectName: string,
  ) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Canva Blocks - Website Publishing Failed',
      template: './website-publish-failed',
      context: {
        name: user.name,
        projectName,
      },
    });

    console.log(`A failed publish website email is sent to [${user.email}]`);
  }

  async testMail(message: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Canva Blocks - Test Mail',
      html: `<p>HELLO WORLD</p><p>${message}</p>`,
    });

    console.log(`A test email is sent to [${email}]`);
  }

  @OnEvent(PAYMENT_EVENTS.DONATION_PAYMENT_COMPLETED)
  async sendDonationThanks(event: DonationPaymentCompletedEvent) {
    const user = await this.userRepository.findById(event.userId);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Thank you for your donation to Canva Blocks',
      template: './thanks-for-donation',
      context: {
        name: user.name,
      },
    });

    console.log(`A thanks for donation email is sent to [${user.email}]`);
  }
}
