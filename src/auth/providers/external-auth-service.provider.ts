import { Provider } from '@nestjs/common';
import { IExtrnalAuthService } from '../external/external-auth.interface';
import { FusionAuthService } from '../external/fusionauth.service';

export const externalAuthServiceProvider: Provider = {
  provide: IExtrnalAuthService,
  useClass: FusionAuthService,
};
