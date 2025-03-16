import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from 'src/common/exceptions';
import { Component } from 'src/datasource/entities/component.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { IComponentRepository } from './icomponent.repository';
import { ComponentType } from '@prisma/client';

@Injectable()
export class ComponentRepository implements IComponentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Component[]> {
    const components = await this.prisma.component.findMany();

    return components;
  }

  async FindAllFilter(type: ComponentType): Promise<Component[]> {
    const components = await this.prisma.component.findMany({
      where: type ? { type } : {},
    });

    return components;
  }

  async findById(id: number): Promise<Component> {
    const component = await this.prisma.component.findUnique({
      where: { id },
    });

    if (!component) {
      throw new EntityNotFoundException('component');
    }

    return component;
  }
}
