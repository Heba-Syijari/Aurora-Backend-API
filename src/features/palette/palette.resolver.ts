import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDecorator } from 'src/common/decorators';
import {
  CreatePaletteInput,
  DeletePaletteInput,
  UpdatePaletteInput,
} from './dto';
import { Palettes } from './entities/palette.entity';
import { PaletteService } from './palette.service';

@Resolver(() => Palettes)
export class PaletteResolver {
  constructor(private readonly paletteService: PaletteService) {}
  @Query(() => Palettes, { name: 'palette' })
  // @UseGuards(PageOwnerGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.paletteService.findOne(id);
  }

  @Query(() => [Palettes], { name: 'palettes' })
  getMyProjects(@UserDecorator('id') userId: string) {
    return this.paletteService.getPalettesForUser(userId);
  }

  @Mutation(() => Palettes)
  createPalette(
    @UserDecorator('id') userId: string,
    @Args('input') input: CreatePaletteInput,
  ) {
    return this.paletteService.createPalette(userId, input);
  }
  @Mutation(() => Boolean)
  // @UseGuards(SubscriptionGuard, PageOwnerGuard)
  deletePalettes(@Args('input') input: DeletePaletteInput) {
    return this.paletteService.deletePalette(input);
  }
  @Mutation(() => Boolean)
  // @UseGuards(SubscriptionGuard, PageOwnerGuard)
  updatePalettes(@Args('input') input: UpdatePaletteInput) {
    return this.paletteService.updatePalette(input.id, input);
  }
}
