import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { ISupscriptionVariation, SupscriptionVariation } from './types';
import {
  SupscriptionFiveVariation,
  SupscriptionFourVariation,
  SupscriptionOneVariation,
  SupscriptionSixVariation,
  SupscriptionThreeVariation,
  SupscriptionTwoVariation,
} from './variations';

export class SupscriptionFactory implements IComponentFactory {
  create(variation: ISupscriptionVariation): IComponentVariationFactory {
    switch (variation) {
      case SupscriptionVariation.SUBSCRIPTION_ONE:
        return new SupscriptionOneVariation();

      case SupscriptionVariation.SUBSCRIPTION_TWO:
        return new SupscriptionTwoVariation();

      case SupscriptionVariation.SUBSCRIPTION_THREE:
        return new SupscriptionThreeVariation();

      case SupscriptionVariation.SUBSCRIPTION_FOUR:
        return new SupscriptionFourVariation();

      case SupscriptionVariation.SUBSCRIPTION_FIVE:
        return new SupscriptionFiveVariation();

      case SupscriptionVariation.SUBSCRIPTION_SIX:
        return new SupscriptionSixVariation();
      default:
        throw new Error(
          `variation [${variation}] is not implemented as Supscription`,
        );
    }
  }
}
