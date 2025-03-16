import { IComponentVariationFactory } from '../icomponent-variation.factory';
import { IComponentFactory } from '../icomponent.factory';
import {
  IMessageWithActionVariation,
  MessageWithActionVariation,
} from './types';
import { MessageWithActionOneVariation } from './variations';

export class MessageWithActionFactory implements IComponentFactory {
  create(variation: IMessageWithActionVariation): IComponentVariationFactory {
    switch (variation) {
      case MessageWithActionVariation.MESSAGE_WITH_ACTION_ONE:
        return new MessageWithActionOneVariation();

      default:
        throw new Error(
          `variation [${variation}] is not implemented as <Message With Action>`,
        );
    }
  }
}
