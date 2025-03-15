import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StorageService } from './storage.service';
import { storageServiceProvider } from './providers';

@Module({
  imports: [HttpModule],
  providers: [StorageService, storageServiceProvider],
  exports: [StorageService],
})
export class StorageModule {}
