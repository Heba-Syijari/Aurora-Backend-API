import { Injectable } from '@nestjs/common';
import { HeroVariation } from '../../components/factory/hero/types';
import { ContentGeneratorService } from '../content-generator.service';
import { HeroContentDto } from '../dto';
import {
  HeroEightContent,
  HeroElevenContent,
  HeroFiveContent,
  HeroFourContent,
  HeroNineContent,
  HeroOneContent,
  HeroSevenContent,
  HeroSixContent,
  HeroTenContent,
  HeroThreeContent,
  HeroTwoContent,
} from '../types';

@Injectable()
export class ContentGeneratorHeroService {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}

  // @ConsumeTextGenerations(1, true)
  public async generateHeroOneContent(
    dto: HeroContentDto,
  ): Promise<HeroOneContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateHero(
      dto,
      HeroVariation.HERO_ONE,
    )) as HeroOneContent;
    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    return {
      image: content.image,
      title: content.title,
      description: content.description,
    };
  }

  // @ConsumeTextGenerations(1, true)
  public async generateHeroTwoContent(
    dto: HeroContentDto,
  ): Promise<HeroTwoContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateHero(
      dto,
      HeroVariation.HERO_TWO,
    )) as HeroTwoContent;
    return {
      title: content.title,
      description: content.description,
    };
  }

  // // @ConsumeTextGenerations(1, true)
  public async generateHeroThreeContent(
    dto: HeroContentDto,
  ): Promise<HeroThreeContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateHero(
      dto,
      HeroVariation.HERO_THREE,
    )) as HeroThreeContent;
    return {
      title: content.title,
      description: content.description,
    };
  }

  // // @ConsumeTextGenerations(1, true)
  public async generateHeroFourContent(
    dto: HeroContentDto,
  ): Promise<HeroFourContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateHero(
      dto,
      HeroVariation.HERO_FOUR,
    )) as HeroFourContent;
    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });

    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateHeroFiveContent(
    dto: HeroContentDto,
  ): Promise<HeroFiveContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateHero(
      dto,
      HeroVariation.HERO_FIVE,
    )) as HeroFiveContent;
    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });

    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateHeroSixContent(
    dto: HeroContentDto,
  ): Promise<HeroSixContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateHero(
      dto,
      HeroVariation.HERO_SIX,
    )) as HeroSixContent;
    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });

    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateHeroSevenContent(
    dto: HeroContentDto,
  ): Promise<HeroSevenContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateHero(
      dto,
      HeroVariation.HERO_SEVEN,
    )) as HeroSevenContent;
    content.mainImage = await this.contentGeneratorService.generateImage({
      prompt: content.mainImage,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    content.backGroundImage = await this.contentGeneratorService.generateImage({
      prompt: content.backGroundImage,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });

    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateEightContent(
    dto: HeroContentDto,
  ): Promise<HeroEightContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateHero(
      dto,
      HeroVariation.HERO_EIGHT,
    )) as HeroEightContent;
    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });

    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateNineContent(
    dto: HeroContentDto,
  ): Promise<HeroNineContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateHero(
      dto,
      HeroVariation.HERO_NINE,
    )) as HeroNineContent;
    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });

    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateTenContent(
    dto: HeroContentDto,
  ): Promise<HeroTenContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateHero(
      dto,
      HeroVariation.HERO_TEN,
    )) as HeroTenContent;
    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });

    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateElevenContent(
    dto: HeroContentDto,
  ): Promise<HeroElevenContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateHero(
      dto,
      HeroVariation.HERO_ELEVEN,
    )) as HeroElevenContent;
    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    content.backgroundImage = await this.contentGeneratorService.generateImage({
      prompt: content.backgroundImage,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });

    return content;
  }
}
