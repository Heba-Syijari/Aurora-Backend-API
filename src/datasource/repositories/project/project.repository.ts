import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from 'src/common/exceptions';
import { CreateProjectDto, UpdateProjectDto } from 'src/datasource/dto/project';
import { Media } from 'src/datasource/entities/media.entity';
import { Project } from 'src/datasource/entities/project.entity';
import { ProjectMapper } from 'src/datasource/mappers/project.mapper';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectGenerationStatus } from 'src/types';
import { RequireAtLeastOne } from 'src/types/declaration';
import {
  IFindAllProjectsFilter,
  IFindProjectFilter,
  IFindProjectInclude,
  IProjectRepository,
  IUpdateProjectSettingsPayload,
} from './iproject.repository';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter: IFindAllProjectsFilter): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      where: { ...filter },
      include: { settings: true },
      orderBy: { createdAt: 'desc' },
    });

    return projects.map(ProjectMapper.fromDB);
  }

  async findOne(
    filter: RequireAtLeastOne<IFindProjectFilter>,
    include?: IFindProjectInclude,
  ): Promise<Project> {
    const { pageId, ...filters } = filter;

    const project = await this.prisma.project.findFirst({
      where: {
        ...filters,
        ...(pageId ? { pages: { some: { id: pageId } } } : {}),
      },
      include: {
        settings: true,
        audience: true,
        posts: !!include?.posts,
        media: !!include?.media,
        pages: include?.pages && {
          include: {
            components: {
              orderBy: { order: 'asc' },
              include: { component: true },
            },
          },
          orderBy: { id: 'asc' },
        },
        contactMessages: include?.contactMessages && {
          orderBy: { createdAt: 'desc' },
        },
        plugins: !!include?.plugins,
        domainRegistration: { include: { domainRegistration: true } },
      },
    });

    if (!project) {
      throw new EntityNotFoundException('project');
    }

    return ProjectMapper.fromDB(project);
  }

  async count(filter: RequireAtLeastOne<IFindProjectFilter>): Promise<number> {
    const { pageId, ...filters } = filter;

    return await this.prisma.project.count({
      where: {
        ...filters,
        ...(pageId ? { pages: { some: { id: pageId } } } : {}),
      },
    });
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const project = await this.prisma.project.create({
      data: {
        userId: dto.userId,
        name: dto.name,
        type: dto.type,
        purpose: dto.purpose,
        description: dto.description,
        keywords: dto.keywords,
        similarWebsites: dto.similarWebsites,
        websiteLocation: dto.websiteLocation,
        mainLanguage: dto.mainLanguage,
        intellectualPropertyType: dto.intellectualProperty.type,
        intellectualPropertyInfo: JSON.stringify(dto.intellectualProperty),
        audience: {
          create: {
            age: dto.audience.age,
            gender: dto.audience.gender,
            organizations: dto.audience.organizations,
            countries: dto.audience.countries,
          },
        },
        settings: {
          create: {
            logoType: dto.design.logoType,
            logoValue: dto.design.logoValue,
            fontFamily: dto.design.fontFamily,
            palette: { ...dto.design.palette },
          },
        },
        generation: {
          create: {
            status: ProjectGenerationStatus.RUNNING,
          },
        },
      },
    });

    if (dto.media.length > 0) {
      const media = await this.prisma.media.createMany({
        data: dto.media.map((item) => ({
          ...item,
          projectId: project.id,
        })),
      });

      console.log({ mediaCreated: media.count });
    }

    return ProjectMapper.fromDB(project);
  }

  async update(dto: UpdateProjectDto): Promise<boolean> {
    const { intellectualProperty, audience, design, media, plugins, ...rest } =
      dto;

    await this.prisma.project.update({
      where: { id: dto.id, userId: dto.userId },
      data: {
        ...rest,
        ...(intellectualProperty && {
          intellectualPropertyType: intellectualProperty.type,
          intellectualPropertyInfo: JSON.stringify(intellectualProperty),
        }),
        ...(media && {
          media: { deleteMany: {}, createMany: { data: media } },
        }),
        plugins: { deleteMany: { variation: { notIn: plugins } } },
      },
    });

    if (audience) {
      await this.prisma.projectAudience.update({
        where: { projectId: dto.id },
        data: { ...audience },
      });
    }

    if (design) {
      await this.prisma.projectSettings.update({
        where: { projectId: dto.id },
        data: {
          logoType: design.logoType,
          logoValue: design.logoValue,
          fontFamily: design.fontFamily,
          palette: { ...design.palette },
        },
      });
    }

    return true;
  }

  async setPullZoneId(
    projectId: string,
    cdnPullZoneId: number,
  ): Promise<boolean> {
    await this.prisma.project.update({
      where: { id: projectId },
      data: { cdnPullZoneId },
    });

    return true;
  }

  async updateSettings(
    payload: IUpdateProjectSettingsPayload,
  ): Promise<boolean> {
    await this.prisma.projectSettings.update({
      where: { projectId: payload.projectId },
      data: {
        logoType: payload.logoType,
        logoValue: payload.logoValue,
        fontFamily: payload.fontFamily,
        palette: payload.palette,
      },
    });

    return true;
  }

  async getProjectMedia(projectId: string): Promise<Media[]> {
    const medias = await this.prisma.media.findMany({
      where: { projectId },
    });

    return medias;
  }

  async delete(projectId: string): Promise<boolean> {
    const deleted = await this.prisma.project.delete({
      where: { id: projectId },
    });

    return !!deleted;
  }
}
