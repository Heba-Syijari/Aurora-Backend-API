import { ComponentType } from '@prisma/client';
import { Component } from 'src/datasource/entities/component.entity';

export interface IComponentRepository {
  FindAllFilter(type: ComponentType): Promise<Component[]>;

  findById(id: number): Promise<Component>;

  findAll(): Promise<Component[]>;
}

export const IComponentRepository = Symbol('IComponentRepository');
