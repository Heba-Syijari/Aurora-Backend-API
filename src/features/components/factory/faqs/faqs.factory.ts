import { ContentGeneratorService } from 'src/features/content-generator/content-generator.service';
import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { FAQsVariation, IFAQsVariation } from './types';
import { FAQsEightVariation, FAQsOneVariation } from './variations';

export class FAQsFactory implements IComponentFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}

  create(variation: IFAQsVariation): IComponentVariationFactory {
    switch (variation) {
      case FAQsVariation.FAQ_ONE:
        return new FAQsOneVariation(this.contentGeneratorService);

      case FAQsVariation.FAQ_TWO:
        return new FAQsOneVariation(this.contentGeneratorService);

      case FAQsVariation.FAQ_THREE:
        return new FAQsOneVariation(this.contentGeneratorService);

      case FAQsVariation.FAQ_FOUR:
        return new FAQsOneVariation(this.contentGeneratorService);

      case FAQsVariation.FAQ_FIVE:
        return new FAQsOneVariation(this.contentGeneratorService);

      case FAQsVariation.FAQ_SIX:
        return new FAQsOneVariation(this.contentGeneratorService);

      case FAQsVariation.FAQ_SEVEN:
        return new FAQsOneVariation(this.contentGeneratorService);

      case FAQsVariation.FAQ_EIGHT:
        return new FAQsEightVariation(this.contentGeneratorService);

      default:
        throw new Error(`variation [${variation}] is not implemented as FAQs`);
    }
  }
}
