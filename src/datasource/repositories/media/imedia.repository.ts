import { Media } from 'src/features/media/entities/media.entity';

export type CreateMediaPayload = Omit<Media, 'id'>;

export type UpadteMediaPayload = Partial<Omit<Media, 'projectId'>>;

export interface IMediaRepository {
  findAll(filter: { projectId: string }): Promise<Media[]>;
  findById(id: number): Promise<Media>;
  create(data: CreateMediaPayload): Promise<Media>;
  update(data: UpadteMediaPayload): Promise<Media>;
  remove(id: number): Promise<Media>;
}

export const IMediaRepository = Symbol('IMediaRepository');
