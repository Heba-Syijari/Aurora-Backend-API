import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from 'src/common/exceptions';
import { CreatePageDto, UpdatePageDto } from 'src/datasource/dto/page';
import { Page } from 'src/datasource/entities/page.entity';
import { PageMapper } from 'src/datasource/mappers/page.mapper';
import { PrismaService } from 'src/prisma/prisma.service';
import { slugify } from 'src/utils/strings';
import { ICountFIlters, IPageRepository } from './ipage.repository';

@Injectable()
export class PageRepository implements IPageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Page> {
    const page = await this.prisma.page.findUnique({
      where: { id },
      include: {
        components: {
          orderBy: { order: 'asc' },
          include: { component: true },
        },
      },
    });

    if (!page) {
      throw new EntityNotFoundException('page');
    }

    return PageMapper.fromDB(page);
  }

  async findOne(id: number, projectId: string): Promise<Page> {
    const page = await this.prisma.page.findFirst({
      where: { id, projectId },
      include: {
        components: {
          orderBy: { order: 'asc' },
          include: { component: true },
        },
      },
    });

    if (!page) {
      throw new EntityNotFoundException('page');
    }

    return PageMapper.fromDB(page);
  }

  async count(filters?: ICountFIlters): Promise<number> {
    const count = await this.prisma.page.count({
      where: {
        ...(filters.projectId && { projectId: filters.projectId }),
      },
    });

    return count;
  }

  async create(dto: CreatePageDto): Promise<Page> {
    const page = await this.prisma.page.create({
      data: {
        title: dto.title,
        description: dto.description,
        slug: slugify(dto.title),
        projectId: dto.projectId,
        components: {
          createMany: {
            data: dto.components.map((component) => ({
              componentId: component.id,
              data: component.data,
              order: component.order,
            })),
          },
        },
      },
    });

    return page;
  }

  async update(dto: UpdatePageDto): Promise<Page> {
    const page = await this.prisma.page.update({
      where: { id: dto.pageId },
      data: {
        title: dto.title,
        description: dto.description,
        slug: slugify(dto.title),
        ...(dto.components
          ? {
              components: {
                deleteMany: {},
                createMany: {
                  data: dto.components.map((component) => ({
                    componentId: component.id,
                    data: component.data,
                    order: component.order,
                  })),
                },
              },
            }
          : {}),
      },
    });

    return page;
  }

  async remove(id: number, projectId: string): Promise<boolean> {
    await this.prisma.page.delete({
      where: { id, projectId },
    });

    return true;
  }
}
