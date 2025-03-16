import { ContentGeneratorService } from 'src/features/content-generator/content-generator.service';
import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { HowItWorkVariation, IHowItWorkVariation } from './types';
import { HowItWorkOneVariation } from './variations';

export class HowItWorkFactory implements IComponentFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}
  create(variation: IHowItWorkVariation): IComponentVariationFactory {
    switch (variation) {
      case HowItWorkVariation.HOW_IT_WORKS_ONE:
        return new HowItWorkOneVariation(this.contentGeneratorService);

      default:
        throw new Error(
          `variation [${variation}] is not implemented as <How It Work>`,
        );
    }
  }
}
