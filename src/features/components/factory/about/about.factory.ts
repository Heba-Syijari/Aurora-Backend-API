import { ContentGeneratorAboutService } from 'src/features/content-generator/service/content-generator-about.service ';
import { StorageService } from 'src/storage';
import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { AboutVariation, IAboutVariation } from './types';
import {
  AboutFiveVariation,
  AboutFourVariation,
  AboutOneVariation,
  AboutSevenVariation,
  AboutSixVariation,
  AboutThreeVariation,
  AboutTwoVariation,
} from './variations';

export class AboutFactory implements IComponentFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorAboutService,
    private readonly storageService: StorageService,
  ) {}

  create(variation: IAboutVariation): IComponentVariationFactory {
    switch (variation) {
      case AboutVariation.ABOUT_ONE:
        return new AboutOneVariation(this.contentGeneratorService);

      case AboutVariation.ABOUT_TWO:
        return new AboutTwoVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      case AboutVariation.ABOUT_THREE:
        return new AboutThreeVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      case AboutVariation.ABOUT_FOUR:
        return new AboutFourVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      case AboutVariation.ABOUT_FIVE:
        return new AboutFiveVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      case AboutVariation.ABOUT_SIX:
        return new AboutSixVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      case AboutVariation.ABOUT_SEVEN:
        return new AboutSevenVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      default:
        throw new Error(`variation [${variation}] is not implemented as about`);
    }
  }
}
