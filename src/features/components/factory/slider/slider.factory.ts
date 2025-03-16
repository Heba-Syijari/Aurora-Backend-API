import { ContentGeneratorService } from 'src/features/content-generator/content-generator.service';
import { StorageService } from 'src/storage';
import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { ISliderVariation, SliderVariation } from './types';
import { SliderOneVariation } from './variations';

export class SliderFactory implements IComponentFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
    private readonly storageService: StorageService,
  ) {}
  create(variation: ISliderVariation): IComponentVariationFactory {
    switch (variation) {
      case SliderVariation.SLIDER_ONE:
        return new SliderOneVariation(
          this.contentGeneratorService,
          this.storageService,
        );

      default:
        throw new Error(
          `variation [${variation}] is not implemented as slider`,
        );
    }
  }
}
