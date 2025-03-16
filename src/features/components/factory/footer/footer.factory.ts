import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { FooterVariation, IFooterVariation } from './types';
import {
  FooterEightVariation,
  FooterElevenVariation,
  FooterFiveVariation,
  FooterFourteenVariation,
  FooterFourVariation,
  FooterNineVariation,
  FooterOneVariation,
  FooterSevenVariation,
  FooterSixVariation,
  FooterThirteenVariation,
  FooterThreeVariation,
  FooterTwelveVariation,
  FooterTwoVariation,
} from './variations';

export class FooterFactory implements IComponentFactory {
  create(variation: IFooterVariation): IComponentVariationFactory {
    switch (variation) {
      case FooterVariation.FOOTER_ONE:
        return new FooterOneVariation();

      case FooterVariation.FOOTER_TWO:
        return new FooterTwoVariation();

      case FooterVariation.FOOTER_THREE:
        return new FooterThreeVariation();

      case FooterVariation.FOOTER_FOUR:
        return new FooterFourVariation();

      case FooterVariation.FOOTER_FIVE:
        return new FooterFiveVariation();

      case FooterVariation.FOOTER_SIX:
        return new FooterSixVariation();

      case FooterVariation.FOOTER_SEVEN:
        return new FooterSevenVariation();

      case FooterVariation.FOOTER_EIGHT:
        return new FooterEightVariation();

      case FooterVariation.FOOTER_NINE:
        return new FooterNineVariation();

      case FooterVariation.FOOTER_ELEVEN:
        return new FooterElevenVariation();

      case FooterVariation.FOOTER_TWELVE:
        return new FooterTwelveVariation();

      case FooterVariation.FOOTER_THIRTEEN:
        return new FooterThirteenVariation();

      case FooterVariation.FOOTER_FOURTEEN:
        return new FooterFourteenVariation();
      default:
        throw new Error(
          `variation [${variation}] is not implemented as footer`,
        );
    }
  }
}
