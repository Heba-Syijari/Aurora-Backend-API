import { Injectable } from '@nestjs/common';
import { ComponentType } from '@prisma/client';
import { EntityNotFoundException } from 'src/common/exceptions';
import { Menu } from 'src/datasource/entities/menu.entity';
import { MenuMapper } from 'src/datasource/mappers/menu.mapper';
import { CompoentsLanguage } from 'src/language';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateForHeaderPayload,
  CreateMenuPayload,
  IMenuRepository,
  UpadteMenuPayload,
} from './imenu.repository';

@Injectable()
export class MenuRepository implements IMenuRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter: { projectId: string }): Promise<Menu[]> {
    const menus = await this.prisma.menu.findMany({
      where: { projectId: filter.projectId },
      include: { children: true, page: true },
      orderBy: { id: 'asc' },
    });

    return menus.map(MenuMapper.fromDB);
  }

  async findById(id: number): Promise<Menu> {
    const menu = await this.prisma.menu.findUnique({ where: { id } });

    if (!menu) {
      throw new EntityNotFoundException('menu');
    }

    return menu;
  }

  async create(data: CreateMenuPayload): Promise<Menu> {
    const menu = await this.prisma.menu.create({ data: { ...data } });

    return menu;
  }

  async createforHeadr(data: CreateForHeaderPayload): Promise<boolean> {
    let newData: Omit<Menu, 'id' | 'children' | 'parenId'>[] = [];
    const menuChecks = data.components.map(async (component) => {
      if (
        component.type !== ComponentType.HERO &&
        component.type !== ComponentType.FOOTER
      ) {
        const menu = await this.prisma.menu.findFirst({
          where: {
            label: CompoentsLanguage[component.type][data.mainLanguage],
            place: 'header',
            projectId: data.page.projectId,
            section: component.type,
          },
        });

        if (!menu) {
          newData.push({
            label: CompoentsLanguage[component.type][data.mainLanguage],
            place: 'header',
            projectId: data.page.projectId,
            section: component.type,
          });
        }
      }
    });

    await Promise.all(menuChecks);

    const result = await this.prisma.menu.createMany({ data: newData });
    return result.count > 0;
  }

  async update(data: UpadteMenuPayload): Promise<Menu> {
    const menu = await this.prisma.menu.update({
      where: { id: data.id },
      data: { ...data },
    });

    if (!menu) {
      throw new EntityNotFoundException('menu');
    }

    return menu;
  }

  async remove(id: number): Promise<Menu> {
    const menu = await this.prisma.menu.delete({
      where: { id },
    });

    return menu;
  }

  async deleteMenuBySection(pageId: number, section: string) {
    try {
      const menu = await this.prisma.$executeRawUnsafe(
        `
        DELETE FROM "Menu"
        WHERE "projectId" = (
          SELECT "Page"."projectId"
          FROM "Page"
          WHERE "Page"."id" = $1
        )
        AND "section" = $2
        AND NOT EXISTS (
          SELECT 1
          FROM "Page"
          JOIN "ComponentsPages" ON "Page"."id" = "ComponentsPages"."pageId"
          JOIN "Component" ON "ComponentsPages"."componentId" = "Component"."id"
          WHERE "Page"."projectId" = (
            SELECT "Page"."projectId"
            FROM "Page"
            WHERE "Page"."id" = $1
          )
          AND "Component"."type" = $2::"ComponentType"
        )
      `,
        pageId,
        section,
      );
    } catch (error) {
      console.error('error in delete Menu:', error);
      throw new EntityNotFoundException('menu');
    }
  }

  async deleteMenuForPage(projectId: string) {
    try {
      const menu = await this.prisma.$executeRawUnsafe(
        `
        DELETE FROM "Menu"
        WHERE "projectId" = $1::uuid
        AND "section" NOT IN (
          SELECT "Component"."type"::text
          FROM "Page"
          JOIN "ComponentsPages" ON "Page"."id" = "ComponentsPages"."pageId"
          JOIN "Component" ON "ComponentsPages"."componentId" = "Component"."id"
          WHERE "Page"."projectId" = $1::uuid
        )
        `,
        projectId,
      );
    } catch (error) {
      console.error('error in delete menu:', error);
      throw new EntityNotFoundException('menu');
    }
  }
}
