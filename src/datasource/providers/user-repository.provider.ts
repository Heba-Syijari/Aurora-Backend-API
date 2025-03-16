import { Provider } from '@nestjs/common';
import { IUserRepository, UserRepository } from '../repositories/user';

export const userRepositoryProvider: Provider = {
  provide: IUserRepository,
  useClass: UserRepository,
};
