import { Provider } from '@nestjs/common';
import {
  IContactRequestRepository,
  ContactRequestRepository,
} from '../repositories/contact-request';

export const contactRequestRepositoryProvider: Provider = {
  provide: IContactRequestRepository,
  useClass: ContactRequestRepository,
};
