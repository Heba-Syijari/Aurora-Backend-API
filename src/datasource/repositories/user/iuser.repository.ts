import { User } from 'src/features/users/entities/user.entity';

export type ICreateUserPayload = Omit<
  User,
  'createdAt' | 'verified' | 'preferences'
>;

export type IUpdateUserPayload = Partial<Omit<ICreateUserPayload, 'email'>> & {
  id: string;
};

export type IFindOneFilter = {
  id?: string;
  email?: string;
};

export type IFindOneOptions = {
  relations?: {
    preferences?: boolean;
  };
};

export type IUpdateUserPreferencesPayload = {
  userId: string;
  imageModel: string;
  textModel: string;
};

export interface IUserRepository {
  findAll(): Promise<User[]>;

  findById(id: string): Promise<User>;

  findOne(filter: IFindOneFilter, options?: IFindOneOptions): Promise<User>;

  create(payload: ICreateUserPayload): Promise<User>;

  update(payload: IUpdateUserPayload): Promise<User>;

  updateUserPreferences(payload: IUpdateUserPreferencesPayload): Promise<User>;

  remove(id: string): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
