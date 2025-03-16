import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  videoId: number;
};

export class VideoTwoVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const videos = input.media.filter((item) => item.type === 'VIDEO');
    return {
      videoId: videos[0]?.id,
    };
  }
}
