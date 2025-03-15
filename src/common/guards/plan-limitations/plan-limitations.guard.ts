import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_ONE_PROJECT_TRIAL_KEY } from 'src/common/decorators';
import { IPageRepository } from 'src/datasource/repositories/page';
import { IProjectRepository } from 'src/datasource/repositories/project';
import { ISubscriptionRepository } from 'src/datasource/repositories/subscription';
import { IUserRepository } from 'src/datasource/repositories/user';
import { SubscriptionStatus } from 'src/types';
import { PLAN_LIMITATIONS_KEY } from '../../decorators/plan-limitations';
import { PlanFeature } from '../../enums';
import { PlanLimitationChecker } from './plan-limitation-checker';

@Injectable()
export class PlanLimitationsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(ISubscriptionRepository)
    private readonly subscriptionRepository: ISubscriptionRepository,
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
    @Inject(IPageRepository)
    private readonly pageRepository: IPageRepository,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const planFeatures = this.reflector.getAllAndOverride<PlanFeature[]>(
      PLAN_LIMITATIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!planFeatures) {
      return true;
    }

    console.log({ planFeatures });

    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const { user } = req;

    if (user.hasOneFreeTrial) {
      return true;
    }

    const hasOneFreeTrial = await this.hasOneFreeTrial(user.id, context);

    if (hasOneFreeTrial) {
      req.user.hasOneFreeTrial = true;
      return true;
    }

    const args = gqlContext.getArgs();
    const projectId = this.extractProjectId(args);

    const subscription = await this.getUserSubscription(user.id);

    const planLimitationChecker = new PlanLimitationChecker(
      this.projectRepository,
      this.pageRepository,
      this.userRepository,
      { userId: user.id, projectId, subscription },
    );

    try {
      await planLimitationChecker.run(planFeatures);
    } catch (err) {
      console.log(err);
      throw new ForbiddenException(err.message);
    }

    return true;
  }

  private async hasOneFreeTrial(
    userId: string,
    context: ExecutionContext,
  ): Promise<boolean> {
    const isOneProjectTrial = this.reflector.getAllAndOverride<boolean>(
      IS_ONE_PROJECT_TRIAL_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isOneProjectTrial) {
      const projectsCount = await this.projectRepository.count({
        userId,
      });

      return projectsCount === 0;
    }

    return false;
  }

  private extractProjectId(args: any): string {
    let projectId = args.projectId || args.id;

    if (!projectId && args && typeof args === 'object') {
      Object.values(args).forEach((value: any) => {
        projectId = this.extractProjectId(value);
      });
    }

    return projectId;
  }

  private async getUserSubscription(userId: string) {
    try {
      const subscription = await this.subscriptionRepository.findOne(
        {
          userId,
          status: SubscriptionStatus.ACTIVE,
        },
        { relations: { plan: true } },
      );

      return subscription;
    } catch (err) {
      console.log({ err });
      throw new ForbiddenException("You don't have a valid subscription");
    }
  }
}
