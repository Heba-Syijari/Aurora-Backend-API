import { Injectable } from '@nestjs/common';
import { Palette } from '@prisma/client';
import { EntityNotFoundException } from 'src/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePalettePayload,
  IPaletteRepository,
  UpadtePalettePayload,
} from './ipalette.repository';

@Injectable()
export class paletteRepository implements IPaletteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter: { userId: string }): Promise<Palette[]> {
    const palettes = await this.prisma.palette.findMany({
      where: {
        OR: [{ userId: filter.userId }, { userId: null }],
      },
    });

    return palettes;
  }

  async findById(id: string): Promise<Palette> {
    const palette = await this.prisma.palette.findUnique({ where: { id } });

    if (!palette) {
      throw new EntityNotFoundException('palette');
    }

    return palette;
  }

  async create(data: CreatePalettePayload): Promise<Palette> {
    const palette = await this.prisma.palette.create({ data: { ...data } });
    return palette;
  }

  async update(data: UpadtePalettePayload): Promise<Boolean> {
    const palette = await this.prisma.palette.update({
      where: { id: data.id },
      data: { ...data },
    });

    if (!palette) {
      throw new EntityNotFoundException('palette');
    }

    return true;
  }

  async remove(id: string): Promise<Boolean> {
    const thispalette = await this.prisma.palette.findUnique({ where: { id } });

    if (!thispalette) {
      throw new EntityNotFoundException('palette');
    }
    const palette = await this.prisma.palette.delete({
      where: { id },
    });

    return true;
  }
}
