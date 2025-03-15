import { PlanFeature } from 'src/common/enums';
import { PlanFeatureLimitation } from 'src/datasource/entities/plan.entity';
import { Subscription } from 'src/datasource/entities/subscription.entity';
import { IPageRepository } from 'src/datasource/repositories/page';
import { IProjectRepository } from 'src/datasource/repositories/project';
import { IUserRepository } from 'src/datasource/repositories/user';
import { UserPreferences } from 'src/features/users/entities';

type Config = {
  userId: string;
  projectId: string;
  subscription: Subscription;
};

export class PlanLimitationChecker {
  private userPreferences: UserPreferences;

  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly pageRepository: IPageRepository,
    private readonly userRepository: IUserRepository,
    private readonly config: Config,
  ) {}

  public async run(planFeatures: PlanFeature[]) {
    this.userPreferences = await this.getUserPreferences();

    for (const featureKey of planFeatures) {
      await this.checkFeatureLimitation(featureKey);
    }
  }

  private async getUserPreferences(): Promise<UserPreferences> {
    const user = await this.userRepository.findOne(
      { id: this.config.userId },
      { relations: { preferences: true } },
    );

    return user.preferences;
  }

  private async checkFeatureLimitation(featureKey: PlanFeature) {
    const featureLimitation = this.getFeatureLimitation(featureKey);

    switch (featureKey) {
      case PlanFeature.MAX_ALLOWED_PROJECTS:
        return await this.checkProjectLimitation(
          this.config.userId,
          featureLimitation,
        );

      case PlanFeature.MAX_PAGES_PER_PROJECT:
        return await this.checkProjectPagesLimitation(
          this.config.projectId,
          featureLimitation,
        );

      case PlanFeature.EXPORT_PROJECT:
        return this.checkExportProjectLimitation(featureLimitation);

      case PlanFeature.GOOGLE_ANALYTICS_INTEGRATION:
        return this.checkGoogleAnalyticsIntegrationLimitation(
          featureLimitation,
        );

      case PlanFeature.FREE_DOMAIN_NAME:
        return this.checkFreeDomainNameLimitation(featureLimitation);

      case PlanFeature.IMAGE_MODELS:
        return this.checkImageModelsLimitation(featureLimitation);

      case PlanFeature.TEXT_MODELS:
        return this.checkTextModelsLimitation(featureLimitation);
    }
  }

  private getFeatureLimitation(featureKey: PlanFeature): PlanFeatureLimitation {
    const featureLimitation = this.config.subscription.plan.features.find(
      ({ feature }) => feature.key === featureKey,
    );

    if (!featureLimitation) {
      console.log(
        `User [${this.config.userId}] don't has a feature [${featureKey}]`,
      );
    }

    return featureLimitation;
  }

  private async checkProjectLimitation(
    userId: string,
    featureLimitation: PlanFeatureLimitation,
  ): Promise<void> {
    const { limitation } = featureLimitation;

    if (!limitation.max) {
      throw Error(
        "There's an issue in checking your subscription, please contact the support",
      );
    }

    const projectsCount = await this.projectRepository.count({ userId });

    if (projectsCount >= limitation.max) {
      throw new Error("You've reached your limit in creating projects");
    }
  }

  private async checkProjectPagesLimitation(
    projectId: string,
    featureLimitation: PlanFeatureLimitation,
  ): Promise<void> {
    const { limitation } = featureLimitation;

    if (!limitation.max) {
      throw Error(
        "There's an issue in checking your subscription, please contact the support",
      );
    }

    const pagesCount = await this.pageRepository.count({ projectId });

    if (pagesCount >= limitation.max) {
      throw new Error(
        "You've reached your limit in adding new pages to this project",
      );
    }
  }

  private checkExportProjectLimitation(
    featureLimitation: PlanFeatureLimitation,
  ): void {
    if (!featureLimitation) {
      throw new Error(
        "Your subscription doesn't provide export project feature, please contact the support if you think this is wrong",
      );
    }
  }

  private checkGoogleAnalyticsIntegrationLimitation(
    featureLimitation: PlanFeatureLimitation,
  ): void {
    if (!featureLimitation) {
      throw new Error(
        "Your subscription doesn't provide Google Analytics integration, please contact the support if you think this is wrong",
      );
    }
  }

  private checkFreeDomainNameLimitation(
    featureLimitation: PlanFeatureLimitation,
  ): void {
    const { limitation } = featureLimitation;

    if (!limitation?.tld || !limitation?.years) {
      throw Error(
        "There's an issue in checking your subscription, please contact the support",
      );
    }
  }

  private checkImageModelsLimitation(
    featureLimitation: PlanFeatureLimitation,
  ): void {
    const { limitation } = featureLimitation;

    if (!Array.isArray(limitation.options)) {
      throw Error(
        "There's an issue in checking your subscription, please contact the support",
      );
    }

    const preferredImageModel = this.userPreferences.imageModel;

    if (!limitation.options.includes(preferredImageModel)) {
      throw new Error(
        `Your subscription doesn't provide image model [${preferredImageModel}], please contact the support if you think this is wrong`,
      );
    }
  }

  private checkTextModelsLimitation(
    featureLimitation: PlanFeatureLimitation,
  ): void {
    const { limitation } = featureLimitation;

    if (!Array.isArray(limitation.options)) {
      throw Error(
        "There's an issue in checking your subscription, please contact the support",
      );
    }

    const preferredTextModel = this.userPreferences.textModel;

    if (!limitation.options.includes(preferredTextModel)) {
      throw new Error(
        `Your subscription doesn't provide text model [${preferredTextModel}], please contact the support if you think this is wrong`,
      );
    }
  }
}
