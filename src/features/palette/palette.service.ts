import { Inject, Injectable } from '@nestjs/common';
import {} from 'src/datasource/repositories/palette';
import { IPaletteRepository } from 'src/datasource/repositories/palette/ipalette.repository';
import {
  CreatePaletteInput,
  DeletePaletteInput,
  UpdatePaletteInput,
} from './dto';

@Injectable()
export class PaletteService {
  constructor(
    @Inject(IPaletteRepository)
    private readonly paletteRepository: IPaletteRepository,
  ) {}

  async findOne(id: string) {
    return await this.paletteRepository.findById(id);
  }
  async getPalettesForUser(userId: string) {
    return await this.paletteRepository.findAll({ userId });
  }
  async createPalette(userId: string, input: CreatePaletteInput) {
    return await this.paletteRepository.create({ userId, ...input });
  }

  async deletePalette(input: DeletePaletteInput) {
    return await this.paletteRepository.remove(input.id);
  }
  async updatePalette(id: string, input: UpdatePaletteInput) {
    return await this.paletteRepository.update({ id, ...input });
  }
}
