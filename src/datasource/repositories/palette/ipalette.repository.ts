import { Palette } from '@prisma/client';

export type CreatePalettePayload = Omit<Palette, 'id'>;

export type UpadtePalettePayload = Partial<Omit<Palette, 'userId'>>;

export interface IPaletteRepository {
  findAll(filter: { userId: string }): Promise<Palette[]>;
  findById(id: string): Promise<Palette>;
  create(data: CreatePalettePayload): Promise<Palette>;
  update(data: UpadtePalettePayload): Promise<Boolean>;
  remove(id: string): Promise<Boolean>;
}

export const IPaletteRepository = Symbol('IPaletteRepository');
