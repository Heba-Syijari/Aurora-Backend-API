import { Module } from '@nestjs/common';
import { CdnService } from './cdn.service';
import { BunnyCDNService } from './bunny';

@Module({
  providers: [CdnService, BunnyCDNService],
  exports: [BunnyCDNService],
})
export class CdnModule {}
