import { Mutation, Resolver } from '@nestjs/graphql';
import { Public } from 'src/common/decorators/public.decorator';
import { MailService } from './mail.service';

@Resolver(() => String)
export class MailResolver {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Mutation(() => String)
  async sendMail() {
    await this.mailService.testMail('message is here', 'maszzzzy@gmail.com');
    return 'success';
  }
}
