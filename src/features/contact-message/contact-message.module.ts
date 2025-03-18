import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { ContactMessageService } from './contact-message.service';
import { ContactMessageResolver } from './contact-message.resolver';

@Module({
  imports: [DatasourceModule],
  providers: [ContactMessageResolver, ContactMessageService],
})
export class ContactMessageModule {}
