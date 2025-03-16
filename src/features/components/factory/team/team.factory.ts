import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { ITeamVariation, TeamVariation } from './types';
import {
  TeamFourVariation,
  TeamOneVariation,
  TeamThreeVariation,
  TeamTwoVariation,
} from './variations';

export class TeamFactory implements IComponentFactory {
  create(variation: ITeamVariation): IComponentVariationFactory {
    switch (variation) {
      case TeamVariation.TEAM_ONE:
        return new TeamOneVariation();

      case TeamVariation.TEAM_TWO:
        return new TeamTwoVariation();

      case TeamVariation.TEAM_THREE:
        return new TeamThreeVariation();

      case TeamVariation.TEAM_FOUR:
        return new TeamFourVariation();

      default:
        throw new Error(`variation [${variation}] is not implemented as team`);
    }
  }
}
