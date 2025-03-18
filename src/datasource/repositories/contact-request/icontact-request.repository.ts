import { ContactRequest } from 'src/datasource/entities/contact-request.entity';

export type ICreateContactRequestPayload = Omit<
  ContactRequest,
  'id' | 'status' | 'createdAt' | 'updatedAt' | 'assignee'
>;

export type IUpdateContactRequestPayload = Pick<
  Partial<ContactRequest>,
  'status' | 'assigneeId'
> & { id: number };

export type IFindAllContactRequestsFilter = Partial<
  Omit<ContactRequest, 'id' | 'assignee' | 'createdAt' | 'updatedAt'>
>;

export interface IContactRequestRepository {
  findAll(filter?: IFindAllContactRequestsFilter): Promise<ContactRequest[]>;

  findById(id: number): Promise<ContactRequest>;

  create(payload: ICreateContactRequestPayload): Promise<ContactRequest>;

  update(payload: IUpdateContactRequestPayload): Promise<ContactRequest>;

  remove(id: number): Promise<ContactRequest>;
}

export const IContactRequestRepository = Symbol('IContactRequestRepository');
