import { Module } from '@nestjs/common';
import { datasourceProviders } from './providers';

@Module({
  providers: [...datasourceProviders],
  exports: [...datasourceProviders],
})
export class DatasourceModule {}
