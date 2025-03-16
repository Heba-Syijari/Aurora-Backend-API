import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';

@Module({
  imports: [DatasourceModule],
  providers: [MediaResolver, MediaService],
})
export class MediaModule {}
