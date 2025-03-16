import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CheckPlanLimitations, UserDecorator } from 'src/common/decorators';
import { PlanFeature } from 'src/common/enums';
import { PlanLimitationsGuard } from 'src/common/guards';
import { ContentGeneratorService } from './content-generator.service';
import { RegenerateTextInput } from './input';

// @CheckPlanLimitations(PlanFeature.IMAGE_MODELS, PlanFeature.TEXT_MODELS)
// @UseGuards(PlanLimitationsGuard)
@Resolver()
export class ContentGeneratorResolver {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}

  @Mutation(() => [String])
  suggestDomainNames(
    @UserDecorator('id') userId: string,
    @Args('keyword') keyword: string,
  ) {
    return this.contentGeneratorService.suggestDomainNames({ keyword, userId });
  }

  @Mutation(() => String)
  enhanceText(@UserDecorator('id') userId: string, @Args('text') text: string) {
    return this.contentGeneratorService.enhanceText({ text, userId });
  }

  @Mutation(() => [String])
  suggestLogoTexts(
    @UserDecorator('id') userId: string,
    @Args('keyword') keyword: string,
  ) {
    return this.contentGeneratorService.suggestLogoTexts({ keyword, userId });
  }

  @Mutation(() => String)
  async generateText(
    @UserDecorator('id') userId: string,
    @Args('text') text: string,
  ) {
    return this.contentGeneratorService.generateText({ text, userId });
  }

  @Mutation(() => String)
  regenerateText(
    @UserDecorator('id') userId: string,
    @Args('input') input: RegenerateTextInput,
  ) {
    return this.contentGeneratorService.regenerateText({
      ...input,
      userId,
    });
  }

  @Mutation(() => String)
  generateImage(
    @UserDecorator('id') userId: string,
    @Args('description') description: string,
  ) {
    return this.contentGeneratorService.generateImage({
      prompt: description,
      userId,
    });
  }
}
