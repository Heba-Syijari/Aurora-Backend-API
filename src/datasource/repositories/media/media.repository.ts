import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityNotFoundException } from 'src/common/exceptions';
import { Media } from 'src/features/media/entities/media.entity';
import {
  CreateMediaPayload,
  IMediaRepository,
  UpadteMediaPayload,
} from './imedia.repository';

@Injectable()
export class MediaRepository implements IMediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter: { projectId: string }): Promise<Media[]> {
    const medias = await this.prisma.media.findMany({
      where: { projectId: filter.projectId },
    });

    return medias;
  }

  async findById(id: number): Promise<Media> {
    const media = await this.prisma.media.findUnique({ where: { id } });

    if (!media) {
      throw new EntityNotFoundException('media');
    }

    return media;
  }

  async create(data: CreateMediaPayload): Promise<Media> {
    const media = await this.prisma.media.create({ data: { ...data } });

    return media;
  }

  async update(data: UpadteMediaPayload): Promise<Media> {
    const media = await this.prisma.media.update({
      where: { id: data.id },
      data: { ...data },
    });

    if (!media) {
      throw new EntityNotFoundException('media');
    }

    return media;
  }

  async remove(id: number): Promise<Media> {
    const media = await this.prisma.media.delete({
      where: { id },
    });

    return media;
  }
}
