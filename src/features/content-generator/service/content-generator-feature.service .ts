import { Injectable } from '@nestjs/common';
import { FeatureVariation } from 'src/features/components/factory/feature/types';
import { ContentGeneratorService } from '../content-generator.service';
import { BaseContentDto } from '../dto';
import {
  FeatureEightContent,
  FeatureElevenContent,
  FeatureFiveContent,
  FeatureFourContent,
  FeatureNineContent,
  FeatureOneContent,
  FeatureSevenContent,
  FeatureSixContent,
  FeatureTenContent,
  FeatureThirteenContent,
  FeatureThreeContent,
  FeatureTwelveContent,
  FeatureTwoContent,
} from '../types';

@Injectable()
export class ContentGeneratorFeatureService {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}

  // @ConsumeTextGenerations(1, true)
  public async generateOneContent(
    dto: BaseContentDto,
  ): Promise<FeatureOneContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_ONE,
    )) as FeatureOneContent;

    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateTwoContent(
    dto: BaseContentDto,
  ): Promise<FeatureTwoContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_TWO,
    )) as FeatureTwoContent;
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateThreeContent(
    dto: BaseContentDto,
  ): Promise<FeatureThreeContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_THREE,
    )) as FeatureThreeContent;

    content.image1 = await this.contentGeneratorService.generateImage({
      prompt: content.image1,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    content.image2 = await this.contentGeneratorService.generateImage({
      prompt: content.image2,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    content.image3 = await this.contentGeneratorService.generateImage({
      prompt: content.image3,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateFourContent(
    dto: BaseContentDto,
  ): Promise<FeatureFourContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_FOUR,
    )) as FeatureFourContent;

    content.image1 = await this.contentGeneratorService.generateImage({
      prompt: content.image1,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    content.image2 = await this.contentGeneratorService.generateImage({
      prompt: content.image2,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });

    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateFiveContent(
    dto: BaseContentDto,
  ): Promise<FeatureFiveContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_FIVE,
    )) as FeatureFiveContent;
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateSixContent(
    dto: BaseContentDto,
  ): Promise<FeatureSixContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_SIX,
    )) as FeatureSixContent;
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateSevenContent(
    dto: BaseContentDto,
  ): Promise<FeatureSevenContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_SEVEN,
    )) as FeatureSevenContent;
    return content;
  }
  // @ConsumeTextGenerations(1, true)
  public async generateEightContent(
    dto: BaseContentDto,
  ): Promise<FeatureEightContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_EIGHT,
    )) as FeatureEightContent;
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateNineContent(
    dto: BaseContentDto,
  ): Promise<FeatureNineContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_NINE,
    )) as FeatureNineContent;
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateTenContent(
    dto: BaseContentDto,
  ): Promise<FeatureTenContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_TEN,
    )) as FeatureTenContent;
    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateElevenContent(
    dto: BaseContentDto,
  ): Promise<FeatureElevenContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_ELEVEN,
    )) as FeatureElevenContent;
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateTwelveContent(
    dto: BaseContentDto,
  ): Promise<FeatureTwelveContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_TWELVE,
    )) as FeatureTwelveContent;
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateThirteenContent(
    dto: BaseContentDto,
  ): Promise<FeatureThirteenContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateFeature(
      dto,
      FeatureVariation.FEATURE_THIRTEEN,
    )) as FeatureThirteenContent;
    return content;
  }
}
