import { PlanFeature } from 'src/common/enums';
import { CheckPlanLimitations } from './check-plan-limitations.decorator';

export const CheckGoogleAnalyticsIntegrationPlanLimitation = () =>
  CheckPlanLimitations(PlanFeature.GOOGLE_ANALYTICS_INTEGRATION);
