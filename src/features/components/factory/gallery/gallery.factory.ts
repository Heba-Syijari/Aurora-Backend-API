import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { GalleryVariation, IGalleryVariation } from './types';
import {
  GalleryFiveVariation,
  GalleryFourVariation,
  GalleryOneVariation,
  GallerySevenVariation,
  GallerySixVariation,
  GalleryThreeVariation,
  GalleryTwoVariation,
} from './variations';

export class GalleryFactory implements IComponentFactory {
  create(variation: IGalleryVariation): IComponentVariationFactory {
    switch (variation) {
      case GalleryVariation.GALLERY_ONE:
        return new GalleryOneVariation();

      case GalleryVariation.GALLERY_TWO:
        return new GalleryTwoVariation();

      case GalleryVariation.GALLERY_THREE:
        return new GalleryThreeVariation();

      case GalleryVariation.GALLERY_FOUR:
        return new GalleryFourVariation();

      case GalleryVariation.GALLERY_FIVE:
        return new GalleryFiveVariation();

      case GalleryVariation.GALLERY_SIX:
        return new GallerySixVariation();

      case GalleryVariation.GALLERY_SEVEN:
        return new GallerySevenVariation();
      default:
        throw new Error(
          `variation [${variation}] is not implemented as gallery`,
        );
    }
  }
}
