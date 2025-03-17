import { CreatePageDto, UpdatePageDto } from 'src/datasource/dto/page';
import { Page } from 'src/datasource/entities/page.entity';

export type ICountFIlters = {
  projectId?: string;
};

export interface IPageRepository {
  findById(id: number): Promise<Page>;

  findOne(id: number, projectId: string): Promise<Page>;

  count(filters?: ICountFIlters): Promise<number>;

  create(input: CreatePageDto): Promise<Page>;

  update(input: UpdatePageDto): Promise<Page>;

  remove(id: number, projectId: string): Promise<boolean>;
}

export const IPageRepository = Symbol('IPageRepository');
