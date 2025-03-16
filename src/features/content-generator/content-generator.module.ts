import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { StorageModule } from 'src/storage/storage.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { ContentGeneratorResolver } from './content-generator.resolver';
import { ContentGeneratorService } from './content-generator.service';
import {
  contentGeneratorFactoryProvider,
  imageGeneratorFactoryProvider,
} from './providers';
import {
  ContentGeneratorAboutService,
  ContentGeneratorHeroService,
} from './service';
import { ContentGeneratorFeatureService } from './service/content-generator-feature.service ';

@Module({
  imports: [DatasourceModule, HttpModule, StorageModule, SubscriptionModule],
  providers: [
    ContentGeneratorResolver,
    ContentGeneratorHeroService,
    ContentGeneratorFeatureService,
    ContentGeneratorAboutService,
    ContentGeneratorService,
    contentGeneratorFactoryProvider,
    imageGeneratorFactoryProvider,
  ],
  exports: [
    ContentGeneratorService,
    ContentGeneratorFeatureService,
    ContentGeneratorHeroService,
    ContentGeneratorAboutService,
  ],
})
export class ContentGeneratorModule {}
