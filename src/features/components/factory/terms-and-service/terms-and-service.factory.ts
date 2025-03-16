import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { ITermsAndServiceVariation, TermsAndServiceVariation } from './types';
import {
  TermsAndServiceFiveVariation,
  TermsAndServiceFourVariation,
  TermsAndServiceOneVariation,
  TermsAndServiceThreeVariation,
  TermsAndServiceTwoVariation,
} from './variations';

export class TermsAndServiceFactory implements IComponentFactory {
  create(variation: ITermsAndServiceVariation): IComponentVariationFactory {
    switch (variation) {
      case TermsAndServiceVariation.TERMS_AND_SERVICES_ONE:
        return new TermsAndServiceOneVariation();

      case TermsAndServiceVariation.TERMS_AND_SERVICES_TWO:
        return new TermsAndServiceTwoVariation();

      case TermsAndServiceVariation.TERMS_AND_SERVICES_THREE:
        return new TermsAndServiceThreeVariation();

      case TermsAndServiceVariation.TERMS_AND_SERVICES_FOUR:
        return new TermsAndServiceFourVariation();

      case TermsAndServiceVariation.TERMS_AND_SERVICES_FIVE:
        return new TermsAndServiceFiveVariation();
      default:
        throw new Error(
          `variation [${variation}] is not implemented as Terms And Service`,
        );
    }
  }
}
