import { Provider } from '@nestjs/common';
import {
  IContactMessageRepository,
  ContactMessageRepository,
} from '../repositories/contact-message';

export const contactMessageRepositoryProvider: Provider = {
  provide: IContactMessageRepository,
  useClass: ContactMessageRepository,
};
