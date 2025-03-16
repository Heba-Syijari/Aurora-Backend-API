import { IComponentVariationFactory } from './icomponent-variation.factory';

export interface IComponentFactory {
  create(variation: string): IComponentVariationFactory;
}
