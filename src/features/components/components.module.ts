import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { StorageModule } from 'src/storage';
import { ContentGeneratorModule } from '../content-generator/content-generator.module';
import { ComponentsFactory } from './components.factory';
import { ComponentResolver } from './components.resolver';
import { ComponentService } from './components.service';

@Module({
  imports: [ContentGeneratorModule, StorageModule, DatasourceModule],
  providers: [ComponentsFactory, ComponentResolver, ComponentService],
  exports: [ComponentsFactory],
})
export class ComponentsModule {}
