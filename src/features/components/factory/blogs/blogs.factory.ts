import { ContentGeneratorService } from 'src/features/content-generator/content-generator.service';
import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { BlogsOneVariation } from './blogs-one.variation';
import { BlogsVariation } from './types';

export class BlogsFactory implements IComponentFactory {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}
  create(variation: BlogsVariation): IComponentVariationFactory {
    switch (variation) {
      case 'BLOGS_ONE':
        return new BlogsOneVariation(this.contentGeneratorService);

      default:
        throw new Error(`variation [${variation}] is not implemented as blogs`);
    }
  }
}
