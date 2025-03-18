import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDecorator } from 'src/common/decorators';
import { SubscriptionGuard } from 'src/common/guards';
import { ProjectOwnerGuard } from 'src/common/guards/resources';
import { CreateProjectInput } from './dto/create-project/create-project.input';
import { UpdateProjectSettingsInput } from './dto/update-project-settings.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectGeneration } from './entities/project-generation.entity';
import { Project } from './entities/project.entity';
import { ProjectTargetType } from './entities/target-type';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [ProjectTargetType], { name: 'projectTargetTypes' })
  getProjectTargetTypes() {
    return this.projectService.getProjectTargetTypes();
  }

  @Query(() => [Project], { name: 'projects' })
  getMyProjects(@UserDecorator('id') userId: string) {
    return this.projectService.getProjectsForUser(userId);
  }

  @Query(() => Project, { name: 'project' })
  // @UseGuards(ProjectOwnerGuard)
  findProjectById(
    @UserDecorator('id') userId: string,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.projectService.getProject(id, userId);
  }

  @Mutation(() => Project)
  // @OneProjectTrial()
  // @CheckPlanLimitations(
  //   PlanFeature.MAX_ALLOWED_PROJECTS,
  //   PlanFeature.IMAGE_MODELS,
  //   PlanFeature.TEXT_MODELS,
  // )
  // @UseGuards(SubscriptionGuard, PlanLimitationsGuard)
  createProject(
    @UserDecorator('id') userId: string,
    @Args('createProjectInput') input: CreateProjectInput,
  ) {
    console.time('create-project');
    return this.projectService.createProject(userId, input);
  }

  @Query(() => ProjectGeneration, { name: 'projectGeneration' })
  getProjectGeneration(
    @Args('projectId', { type: () => String }) projectId: string,
  ) {
    return this.projectService.getProjectGeneration(projectId);
  }

  @Mutation(() => Boolean)
  // @UseGuards(SubscriptionGuard, ProjectOwnerGuard)
  updateProject(
    @UserDecorator('id') userId: string,
    @Args('updateProjectInput') input: UpdateProjectInput,
  ) {
    return this.projectService.updateProject(userId, input);
  }

  @Mutation(() => Boolean)
  // @UseGuards(SubscriptionGuard, ProjectOwnerGuard)
  updateProjectSettings(
    @Args('updateProjectSettingsInput') input: UpdateProjectSettingsInput,
  ) {
    return this.projectService.updateProjectSettings(input);
  }

  @Mutation(() => Boolean)
  // @CheckExportProjectPlanLimitation()
  // @UseGuards(SubscriptionGuard, ProjectOwnerGuard, PlanLimitationsGuard)
  exportProject(
    @UserDecorator('id') userId: string,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.projectService.exportProject(userId, id);
  }

  @Mutation(() => Boolean)
  // @UseGuards(SubscriptionGuard, ProjectOwnerGuard)
  publishProject(
    @UserDecorator('id') userId: string,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.projectService.publishProject(userId, id);
  }

  @Mutation(() => Boolean)
  // @CheckGoogleAnalyticsIntegrationPlanLimitation()
  // @UseGuards(SubscriptionGuard, ProjectOwnerGuard, PlanLimitationsGuard)
  createAnalyticsProperty(
    @UserDecorator('id') userId: string,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.projectService.createAnalyticsProperty(userId, id);
  }

  @Mutation(() => Boolean)
  // @UseGuards(ProjectOwnerGuard, SubscriptionGuard)
  deleteProject(@Args('id', { type: () => String }) id: string) {
    return this.projectService.deleteProject(id);
  }
}
