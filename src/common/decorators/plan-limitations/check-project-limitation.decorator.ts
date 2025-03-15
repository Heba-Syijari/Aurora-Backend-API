import { PlanFeature } from 'src/common/enums';
import { CheckPlanLimitations } from './check-plan-limitations.decorator';

export const CheckProjectPlanLimitation = () =>
  CheckPlanLimitations(PlanFeature.MAX_ALLOWED_PROJECTS);
