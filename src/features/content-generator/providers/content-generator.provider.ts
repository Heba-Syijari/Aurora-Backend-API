import { Provider } from '@nestjs/common';
import { ContentGeneratorFactory } from '../contracts';

export const contentGeneratorFactoryProvider: Provider =
  ContentGeneratorFactory;
