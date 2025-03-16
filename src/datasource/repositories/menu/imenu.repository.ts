import { Component } from '@prisma/client';
import { Menu } from 'src/datasource/entities/menu.entity';
import { Page } from 'src/datasource/entities/page.entity';
import { LanguageTypeVariation } from 'src/types';

export type CreateMenuPayload = Omit<Menu, 'id' | 'children' | 'pageSlug'>;
export type CreateForHeaderPayload = {
  mainLanguage: LanguageTypeVariation;
  page: Page;
  components: Component[];
};

export type UpadteMenuPayload = Partial<
  Omit<Menu, 'children' | 'projectId' | 'pageSlug'>
>;

export interface IMenuRepository {
  findAll(filter: { projectId: string }): Promise<Menu[]>;
  findById(id: number): Promise<Menu>;
  create(data: CreateMenuPayload): Promise<Menu>;
  createforHeadr(data: CreateForHeaderPayload): Promise<boolean>;
  update(data: UpadteMenuPayload): Promise<Menu>;
  remove(id: number): Promise<Menu>;
  deleteMenuBySection(pageId: number, section: string): Promise<void>;
  deleteMenuForPage(projectId: string): Promise<void>;
}

export const IMenuRepository = Symbol('IMenuRepository');
