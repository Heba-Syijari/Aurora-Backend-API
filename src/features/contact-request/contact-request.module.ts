import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { ContactRequestService } from './contact-request.service';
import { ContactRequestResolver } from './contact-request.resolver';

@Module({
  imports: [DatasourceModule],
  providers: [ContactRequestResolver, ContactRequestService],
})
export class ContactRequestModule {}
