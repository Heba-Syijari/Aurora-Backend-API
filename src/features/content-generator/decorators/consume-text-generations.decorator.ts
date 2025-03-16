import { ConsumeContentGenerations } from './consume-content-generations.decorator';

/**
 * In order to use this decorator you have to declare `getUserSubscription` and `subtractContentGenerations` methods
 * in the parent class.
 * Also the target method should have `userId` as a param inside it like: `someMethod(params: {userId: string})`
 */
export function ConsumeTextGenerations(
  count: number,
  checkFreeTrial?: boolean,
): MethodDecorator {
  return ConsumeContentGenerations('text', count, checkFreeTrial);
}
