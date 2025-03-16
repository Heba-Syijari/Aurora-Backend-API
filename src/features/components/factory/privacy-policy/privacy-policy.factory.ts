import { ContentGeneratorService } from 'src/features/content-generator/content-generator.service';
import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { IPrivacyPoliceVariation, PrivacyPoliceVariation } from './types';
import {
  PrivacyPoliceFourVariation,
  PrivacyPoliceOneVariation,
  PrivacyPoliceThreeVariation,
  PrivacyPoliceTwoVariation,
} from './variations';

export class PrivacyPolicyFactory implements IComponentFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}
  create(variation: IPrivacyPoliceVariation): IComponentVariationFactory {
    switch (variation) {
      case PrivacyPoliceVariation.PRIVACY_POLICY_ONE:
        return new PrivacyPoliceOneVariation(this.contentGeneratorService);

      case PrivacyPoliceVariation.PRIVACY_POLICY_TWO:
        return new PrivacyPoliceTwoVariation(this.contentGeneratorService);

      case PrivacyPoliceVariation.PRIVACY_POLICY_THREE:
        return new PrivacyPoliceThreeVariation(this.contentGeneratorService);

      case PrivacyPoliceVariation.PRIVACY_POLICY_FOUR:
        return new PrivacyPoliceFourVariation(this.contentGeneratorService);

      default:
        throw new Error(
          `variation [${variation}] is not implemented as Privacy Police`,
        );
    }
  }
}
