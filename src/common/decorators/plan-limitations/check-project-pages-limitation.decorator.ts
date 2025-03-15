import { PlanFeature } from 'src/common/enums';
import { CheckPlanLimitations } from './check-plan-limitations.decorator';

export const CheckProjectPagesPlanLimitation = () =>
  CheckPlanLimitations(PlanFeature.MAX_PAGES_PER_PROJECT);
