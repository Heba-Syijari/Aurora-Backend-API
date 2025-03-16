import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { IOurClientsVariation, OurClientsVariation } from './types';
import { OurClientsOneVariation } from './variations';

export class OurClientsFactory implements IComponentFactory {
  create(variation: IOurClientsVariation): IComponentVariationFactory {
    switch (variation) {
      case OurClientsVariation.OUR_CLIENTS_ONE:
        return new OurClientsOneVariation();

      default:
        throw new Error(
          `variation [${variation}] is not implemented as <Our Clients>`,
        );
    }
  }
}
