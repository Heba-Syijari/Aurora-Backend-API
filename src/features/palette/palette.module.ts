import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { PaletteResolver } from './palette.resolver';
import { PaletteService } from './palette.service';

@Module({
  imports: [DatasourceModule],
  providers: [PaletteResolver, PaletteService],
  exports: [PaletteService],
})
export class PaletteModule {}
