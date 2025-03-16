import { Subscription } from 'src/datasource/entities/subscription.entity';
import { ContentGenerationsType } from '../types';
import { consumeGenerationsValidationHandler } from './consume-generations-validation.handler';

/**
 * In order to use this decorator you have to declare `getUserSubscription` and `subtractContentGenerations` methods
 * in the parent class.
 * Also the target method should have `userId` as a param inside it like: `someMethod(params: {userId: string})`
 */
export function ConsumeContentGenerations(
  type: ContentGenerationsType,
  amount: number,
  checkFreeTrial?: boolean,
): MethodDecorator {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value; // save a reference to the original method

    descriptor.value = async function (...args: any[]) {
      const { userId } = args[0];

      if (checkFreeTrial) {
        const hasFreeTrial = await this.isUserHasFreeTrial(userId);

        if (hasFreeTrial) {
          return originalMethod.apply(this, args);
        }
      }

      // handle validation
      const subscription: Subscription = await this.getUserSubscription(userId);
      consumeGenerationsValidationHandler({ amount, subscription, type });

      // run the original method
      const result = originalMethod.apply(this, args);

      // handle success
      try {
        await result;
        await this.subtractContentGenerations(userId, type, amount);
        console.log(
          `Subtract ${amount} from user [${userId}] for ${type} generation`,
        );
      } catch {
        console.log('Operation failed and will not subtract any generation');
      }

      return result;
    };

    return descriptor;
  };
}
