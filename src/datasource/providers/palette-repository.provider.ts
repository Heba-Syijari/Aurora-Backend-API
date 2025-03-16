import { Provider } from '@nestjs/common';
import { IPaletteRepository, paletteRepository } from '../repositories/palette';

export const paletteRepositoryProvider: Provider = {
  provide: IPaletteRepository,
  useClass: paletteRepository,
};
