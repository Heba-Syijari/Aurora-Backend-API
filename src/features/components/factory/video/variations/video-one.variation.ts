import { Color } from 'src/utils/color';
import {
  CreateInput,
  IComponentVariationFactory,
} from '../../icomponent-variation.factory';

type Output = {
  videoId: number;
  titleTextColor: string;
  descriptionTextColor: string;
};

export class VideoOneVariation implements IComponentVariationFactory {
  async getData(input: CreateInput): Promise<Output> {
    const videos = input.media.filter((item) => item.type === 'VIDEO');

    return {
      titleTextColor: Color.textPrimary,
      descriptionTextColor: Color.textSecondary,
      videoId: videos[0]?.id,
    };
  }
}
