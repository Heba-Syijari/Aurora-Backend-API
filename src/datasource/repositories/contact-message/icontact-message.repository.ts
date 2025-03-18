import { ContactMessage } from 'src/datasource/entities/contact-message.entity';

export type ICreateContactMessagePayload = Omit<
  ContactMessage,
  'id' | 'createdAt'
>;

export type IUpdateContactMessagePayload = Partial<
  Omit<ICreateContactMessagePayload, 'projectId'>
> & { id: number };

export interface IContactMessageRepository {
  findAll(projectId: string): Promise<ContactMessage[]>;

  findById(id: number): Promise<ContactMessage>;

  create(payload: ICreateContactMessagePayload): Promise<ContactMessage>;

  update(payload: IUpdateContactMessagePayload): Promise<ContactMessage>;

  remove(id: number, projectId: string): Promise<ContactMessage>;
}

export const IContactMessageRepository = Symbol('IContactMessageRepository');
