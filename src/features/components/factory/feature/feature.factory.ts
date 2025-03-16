import { ContentGeneratorFeatureService } from 'src/features/content-generator/service/content-generator-feature.service ';
import { StorageService } from 'src/storage';
import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { FeatureVariation, IFeatureVariation } from './types';
import {
  FeatureEightVariation,
  FeatureElevenVariation,
  FeatureFiveVariation,
  FeatureFourVariation,
  FeatureNineVariation,
  FeatureOneVariation,
  FeatureSevenVariation,
  FeatureSixVariation,
  FeatureTenVariation,
  FeatureThirteenVariation,
  FeatureThreeVariation,
  FeatureTwelveVariation,
  FeatureTwoVariation,
} from './variations';

export class FeatureFactory implements IComponentFactory {
  constructor(
    private readonly contentGeneratorFeatureService: ContentGeneratorFeatureService,
    private readonly storageService: StorageService,
  ) {}
  create(variation: IFeatureVariation): IComponentVariationFactory {
    switch (variation) {
      case FeatureVariation.FEATURE_ONE:
        return new FeatureOneVariation(this.contentGeneratorFeatureService);

      case FeatureVariation.FEATURE_TWO:
        return new FeatureTwoVariation(this.contentGeneratorFeatureService);

      case FeatureVariation.FEATURE_THREE:
        return new FeatureThreeVariation(
          this.contentGeneratorFeatureService,
          this.storageService,
        );

      case FeatureVariation.FEATURE_FOUR:
        return new FeatureFourVariation(
          this.contentGeneratorFeatureService,
          this.storageService,
        );

      case FeatureVariation.FEATURE_FIVE:
        return new FeatureFiveVariation(this.contentGeneratorFeatureService);

      case FeatureVariation.FEATURE_SIX:
        return new FeatureSixVariation(this.contentGeneratorFeatureService);

      case FeatureVariation.FEATURE_SEVEN:
        return new FeatureSevenVariation(this.contentGeneratorFeatureService);

      case FeatureVariation.FEATURE_EIGHT:
        return new FeatureEightVariation(this.contentGeneratorFeatureService);

      case FeatureVariation.FEATURE_NINE:
        return new FeatureNineVariation(this.contentGeneratorFeatureService);

      case FeatureVariation.FEATURE_TEN:
        return new FeatureTenVariation(
          this.contentGeneratorFeatureService,
          this.storageService,
        );

      case FeatureVariation.FEATURE_ELEVEN:
        return new FeatureElevenVariation(this.contentGeneratorFeatureService);

      case FeatureVariation.FEATURE_TWELVE:
        return new FeatureTwelveVariation(this.contentGeneratorFeatureService);

      case FeatureVariation.FEATURE_THIRTEEN:
        return new FeatureThirteenVariation(
          this.contentGeneratorFeatureService,
        );
      default:
        throw new Error(
          `variation [${variation}] is not implemented as feature`,
        );
    }
  }
}
