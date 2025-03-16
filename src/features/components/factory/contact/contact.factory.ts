import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { ContactVariation, IContactVariation } from './types';
import {
  ContactFiveVariation,
  ContactFourVariation,
  ContactOneVariation,
  ContactSevenVariation,
  ContactSixVariation,
  ContactThreeVariation,
  ContactTwoVariation,
} from './variations';

export class ContactFactory implements IComponentFactory {
  create(variation: IContactVariation): IComponentVariationFactory {
    switch (variation) {
      case ContactVariation.CONTACT_ONE:
        return new ContactOneVariation();

      case ContactVariation.CONTACT_TWO:
        return new ContactTwoVariation();

      case ContactVariation.CONTACT_THREE:
        return new ContactThreeVariation();

      case ContactVariation.CONTACT_FOUR:
        return new ContactFourVariation();

      case ContactVariation.CONTACT_FIVE:
        return new ContactFiveVariation();

      case ContactVariation.CONTACT_SIX:
        return new ContactSixVariation();

      case ContactVariation.CONTACT_SEVEN:
        return new ContactSevenVariation();

      default:
        throw new Error(
          `variation [${variation}] is not implemented as contact`,
        );
    }
  }
}
