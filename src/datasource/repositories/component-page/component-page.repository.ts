import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from 'src/common/exceptions';
import {
  ComponentOnPage,
  CreateComponentPageDto,
  FindAllFilterDto,
  RemoveComponentPageDto,
  ShiftOrderFilterDto,
  UpdateComponentPageDto,
} from 'src/datasource/dto/component-page';
import { PrismaService } from 'src/prisma/prisma.service';
import { IComponentPageRepository } from './icomponent-page.repository';

@Injectable()
export class ComponentPageRepository implements IComponentPageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<ComponentOnPage> {
    const component = this.prisma.componentsPages.findUnique({
      where: { id },
      include: {
        component: true,
      },
    });

    if (!component) {
      throw new EntityNotFoundException('component');
    }

    return component;
  }

  async findAll(filter: FindAllFilterDto): Promise<ComponentOnPage[]> {
    const components = await this.prisma.componentsPages.findMany({
      where: {
        ...(filter.ids ? { id: { in: filter.ids } } : {}),
        ...(filter.pageId ? { pageId: filter.pageId } : {}),
        ...(filter.componentId ? { componentId: filter.componentId } : {}),
      },
    });

    return components;
  }

  async update(input: UpdateComponentPageDto): Promise<ComponentOnPage> {
    const component = await this.prisma.componentsPages.update({
      where: { id: input.id },
      data: { ...input },
    });

    return component;
  }

  async create(input: CreateComponentPageDto): Promise<ComponentOnPage> {
    const component = await this.prisma.componentsPages.create({
      data: {
        pageId: input.pageId,
        componentId: input.componentId,
        order: input.order,
        data: input.data,
      },
    });

    return component;
  }

  async remove(input: RemoveComponentPageDto): Promise<ComponentOnPage> {
    const component = await this.prisma.componentsPages.delete({
      where: {
        id: input.id,
        pageId: input.pageId,
      },
    });

    return component;
  }

  async shiftOrder(input: ShiftOrderFilterDto): Promise<number> {
    const result = await this.prisma.componentsPages.updateMany({
      where: { order: { gte: input.order } },
      data: {
        order: {
          increment: input.value,
        },
      },
    });

    return result.count;
  }
  async updatefooter(pageId: number, componentId: number, newData: any) {
    try {
      const newDataJson = JSON.stringify(newData);
      await this.prisma.$executeRawUnsafe(
        `
        UPDATE "ComponentsPages"
        SET "data" = $1::jsonb
        WHERE "componentId" = $2
        AND "pageId" IN (
          SELECT "id"
          FROM "Page"
          WHERE "projectId" = (
            SELECT "projectId"
            FROM "Page"
            WHERE "id" = $3
          )
        )
      `,
        newDataJson,
        componentId,
        pageId,
      );
    } catch (error) {
      console.error('error in update footer:', error);
    }
  }

  async updateLeyoutfooter(
    id: number,
    projectId: string,
    oldComponentId: number,
    newComponentId: number,
    data: any,
  ): Promise<ComponentOnPage> {
    try {
      const newDataJson = JSON.stringify(data);
      const count = await this.prisma.$executeRaw`
        UPDATE "ComponentsPages"
        SET "data" = ${newDataJson}::jsonb, "componentId" = ${newComponentId}
        WHERE "componentId" = ${oldComponentId}
        AND "pageId" IN (
          SELECT "id"
          FROM "Page"
          WHERE "projectId" = ${projectId}::uuid
        )
      `;
      return await this.findById(id);
    } catch (error) {
      console.error('Error in update footer:', error);
      throw new BadRequestException(`Error in update footer`);
    }
  }
}
