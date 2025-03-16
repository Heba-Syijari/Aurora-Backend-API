import { ContentGeneratorHeroService } from 'src/features/content-generator/service/content-generator-hero.service';
import { StorageService } from 'src/storage';
import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { HeroVariation, IHeroVariation } from './types';
import {
  HeroEightVariation,
  HeroFiveVariation,
  HeroFourVariation,
  HeroNinetVariation,
  HeroOneVariation,
  HeroSevenVariation,
  HeroSixVariation,
  HeroTenVariation,
  HeroThreeVariation,
  HeroTwoVariation,
  HeroeElvenariation,
} from './variations';

export class HeroFactory implements IComponentFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorHeroService,
    private readonly storageService: StorageService,
  ) {}

  create(variation: IHeroVariation): IComponentVariationFactory {
    switch (variation) {
      case HeroVariation.HERO_ONE:
        return new HeroOneVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      case HeroVariation.HERO_TWO:
        return new HeroTwoVariation(this.contentGeneratorService);

      case HeroVariation.HERO_THREE:
        return new HeroThreeVariation(this.contentGeneratorService);

      case HeroVariation.HERO_FOUR:
        return new HeroFourVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      case HeroVariation.HERO_FIVE:
        return new HeroFiveVariation(
          this.contentGeneratorService,
          this.storageService,
        );
      case HeroVariation.HERO_SIX:
        return new HeroSixVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      case HeroVariation.HERO_SEVEN:
        return new HeroSevenVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      case HeroVariation.HERO_EIGHT:
        return new HeroEightVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      case HeroVariation.HERO_NINE:
        return new HeroNinetVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      case HeroVariation.HERO_TEN:
        return new HeroTenVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      case HeroVariation.HERO_ELEVEN:
        return new HeroeElvenariation(
          this.contentGeneratorService,
          this.storageService,
        );

      default:
        throw new Error(
          `variation [${variation}] is not implemented as hero section`,
        );
    }
  }
}
