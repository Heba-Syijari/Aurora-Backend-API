import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDecorator } from 'src/common/decorators';
import {
  AddPageComponentInput,
  ChangeComponentLayoutInput,
  CreatePageInput,
  DeletePageInput,
  RegeneratePageInput,
  RemovePageComponentInput,
  SwapPageComponentsInput,
  UpdatePageComponentInput,
} from './dto';
import { PageComponent } from './entities/page-component.entity';
import { Page } from './entities/page.entity';
import { PageService } from './page.service';

@Resolver(() => Page)
export class PageResolver {
  constructor(private readonly pageService: PageService) {}

  @Query(() => Page, { name: 'page' })
  // @UseGuards(PageOwnerGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pageService.findOne(id);
  }

  @Mutation(() => Page)
  // @CheckPlanLimitations(
  //   PlanFeature.MAX_PAGES_PER_PROJECT,
  //   PlanFeature.IMAGE_MODELS,
  //   PlanFeature.TEXT_MODELS,
  // )
  // @UseGuards(SubscriptionGuard, ProjectOwnerGuard, PlanLimitationsGuard)
  createPage(@Args('input') input: CreatePageInput) {
    return this.pageService.createPage(input);
  }

  @Mutation(() => Boolean)
  // @UseGuards(SubscriptionGuard, PageOwnerGuard)
  deletePage(@Args('input') input: DeletePageInput) {
    return this.pageService.deletePage(input);
  }

  @Mutation(() => Boolean)
  // @CheckPlanLimitations(PlanFeature.IMAGE_MODELS, PlanFeature.TEXT_MODELS)
  // @UseGuards(SubscriptionGuard, ProjectOwnerGuard, PlanLimitationsGuard)
  regeneratePage(@Args('input') input: RegeneratePageInput) {
    return this.pageService.regeneratePage(input);
  }

  @Mutation(() => Boolean)
  // @UseGuards(SubscriptionGuard, PageOwnerGuard)
  swapPageComponents(@Args('input') input: SwapPageComponentsInput) {
    return this.pageService.swapComponents(input.pageId, input);
  }

  @Mutation(() => Boolean)
  // @UseGuards(SubscriptionGuard, PageOwnerGuard)
  updatePageComponent(@Args('input') input: UpdatePageComponentInput) {
    return this.pageService.updateComponent(input.pageId, input);
  }

  @Mutation(() => PageComponent)
  // @UseGuards(SubscriptionGuard, PageOwnerGuard)
  addPageComponent(
    @UserDecorator('id') userId: string,
    @Args('input') input: AddPageComponentInput,
  ) {
    return this.pageService.addComponent(input.pageId, { ...input, userId });
  }

  @Mutation(() => PageComponent)
  // @UseGuards(SubscriptionGuard, PageOwnerGuard)
  removePageComponent(@Args('input') input: RemovePageComponentInput) {
    return this.pageService.removeComponent(input.pageId, input.componentId);
  }

  @Mutation(() => PageComponent)
  // @UseGuards(SubscriptionGuard, PageOwnerGuard)
  changePageComponentLayout(
    @UserDecorator('id') userId: string,
    @Args('input') input: ChangeComponentLayoutInput,
  ) {
    return this.pageService.changeComponentLayout(input.pageId,userId, input);
  }
}
