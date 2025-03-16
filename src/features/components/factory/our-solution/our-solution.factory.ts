import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { IOurSolutionVariation, OurSolutionVariation } from './types';
import {
  OurSolutionFourVariation,
  OurSolutionOneVariation,
  OurSolutionThreeVariation,
  OurSolutionTwoVariation,
} from './variations';

export class OurSolutionFactory implements IComponentFactory {
  create(variation: IOurSolutionVariation): IComponentVariationFactory {
    switch (variation) {
      case OurSolutionVariation.OUR_SOLUTION_ONE:
        return new OurSolutionOneVariation();

      case OurSolutionVariation.OUR_SOLUTION_TWO:
        return new OurSolutionTwoVariation();

      case OurSolutionVariation.OUR_SOLUTION_THREE:
        return new OurSolutionThreeVariation();

      case OurSolutionVariation.OUR_SOLUTION_FOUR:
        return new OurSolutionFourVariation();
      default:
        throw new Error(
          `variation [${variation}] is not implemented as <Our Clients>`,
        );
    }
  }
}
