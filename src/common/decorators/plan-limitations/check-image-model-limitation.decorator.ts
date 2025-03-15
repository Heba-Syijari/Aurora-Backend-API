import { PlanFeature } from 'src/common/enums';
import { CheckPlanLimitations } from './check-plan-limitations.decorator';

export const CheckImageModelPlanLimitation = () =>
  CheckPlanLimitations(PlanFeature.IMAGE_MODELS);
