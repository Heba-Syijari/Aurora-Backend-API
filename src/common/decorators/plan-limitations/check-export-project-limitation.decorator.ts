import { PlanFeature } from 'src/common/enums';
import { CheckPlanLimitations } from './check-plan-limitations.decorator';

export const CheckExportProjectPlanLimitation = () =>
  CheckPlanLimitations(PlanFeature.EXPORT_PROJECT);
