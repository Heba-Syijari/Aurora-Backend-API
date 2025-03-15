import { SetMetadata } from '@nestjs/common';

export const IS_ONE_PROJECT_TRIAL_KEY = 'isOneProjectTrial';
export const OneProjectTrial = () =>
  SetMetadata(IS_ONE_PROJECT_TRIAL_KEY, true);
