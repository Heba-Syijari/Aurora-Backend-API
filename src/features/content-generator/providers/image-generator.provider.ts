import { Provider } from '@nestjs/common';
import { ImageGeneratorFactory } from '../contracts/image';

export const imageGeneratorFactoryProvider: Provider = ImageGeneratorFactory;
