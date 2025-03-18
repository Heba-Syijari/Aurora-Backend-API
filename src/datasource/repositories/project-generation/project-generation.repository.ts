import { Injectable } from '@nestjs/common';
import {
  CreateProjectGenerationDto,
  UpdateProjectGenerationDto,
} from 'src/datasource/dto/project-generation';
import { ProjectGeneration } from 'src/datasource/entities/project-generation.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectGenerationStatus } from 'src/types';
import { IProjectGenerationRepository } from './iproject-generation.repository';

@Injectable()
export class ProjectGenerationRepository
  implements IProjectGenerationRepository
{
  constructor(private readonly prisma: PrismaService) {}

  public async findOne(projectId: string): Promise<ProjectGeneration> {
    const generation = await this.prisma.projectGeneration.findFirst({
      where: { projectId },
    });

    return generation;
  }

  public async create(
    dto: CreateProjectGenerationDto,
  ): Promise<ProjectGeneration> {
    const generation = await this.prisma.projectGeneration.create({
      data: {
        projectId: dto.projectId,
        status: ProjectGenerationStatus.RUNNING,
      },
    });

    return generation;
  }

  public async update(
    dto: UpdateProjectGenerationDto,
  ): Promise<ProjectGeneration> {
    const updated = await this.prisma.projectGeneration.update({
      where: { projectId: dto.projectId },
      data: {
        status: dto.status,
        error: dto.error,
        logs: dto.logs,
      },
    });

    return updated;
  }

  public async delete(projectId: string): Promise<boolean> {
    const deleted = await this.prisma.project.delete({
      where: { id: projectId },
    });

    return !!deleted;
  }
}
