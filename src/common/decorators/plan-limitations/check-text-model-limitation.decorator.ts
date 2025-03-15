import { PlanFeature } from 'src/common/enums';
import { CheckPlanLimitations } from './check-plan-limitations.decorator';

export const CheckTextModelPlanLimitation = () =>
  CheckPlanLimitations(PlanFeature.TEXT_MODELS);
