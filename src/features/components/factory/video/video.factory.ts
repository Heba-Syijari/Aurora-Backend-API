import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import { IVideoVariation } from './types';
import { VideoOneVariation, VideoTwoVariation } from './variations';

export class VideoFactory implements IComponentFactory {
  create(variation: IVideoVariation): IComponentVariationFactory {
    switch (variation) {
      case 'VIDEO_ONE':
        return new VideoOneVariation();

      case 'VIDEO_TWO':
        return new VideoTwoVariation();

      default:
        throw new Error(`variation [${variation}] is not implemented as video`);
    }
  }
}
