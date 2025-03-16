import { Injectable } from '@nestjs/common';
import { AboutVariation } from 'src/features/components/factory/about/types';
import { ContentGeneratorService } from '../content-generator.service';
import { AboutContentDto } from '../dto';
import {
  AboutFiveContent,
  AboutFourContent,
  AboutOneContent,
  AboutSevenContent,
  AboutSixContent,
  AboutThreeContent,
  AboutTwoContent,
} from '../types';

@Injectable()
export class ContentGeneratorAboutService {
  constructor(
    private readonly contentGeneratorService: ContentGeneratorService,
  ) {}

  // @ConsumeTextGenerations(1, true)
  public async generateAboutOneContent(
    dto: AboutContentDto,
  ): Promise<AboutOneContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateAbout(
      dto,
      AboutVariation.ABOUT_ONE,
    )) as AboutOneContent;

    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateAboutTwoContent(
    dto: AboutContentDto,
  ): Promise<AboutTwoContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateAbout(
      dto,
      AboutVariation.ABOUT_TWO,
    )) as AboutTwoContent;
    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateAboutThreeContent(
    dto: AboutContentDto,
  ): Promise<AboutThreeContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateAbout(
      dto,
      AboutVariation.ABOUT_THREE,
    )) as AboutThreeContent;

    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateFourContent(
    dto: AboutContentDto,
  ): Promise<AboutFourContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateAbout(
      dto,
      AboutVariation.ABOUT_FOUR,
    )) as AboutFourContent;

    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    content.cardOneImage = await this.contentGeneratorService.generateImage({
      prompt: content.cardOneImage,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    content.cardTwoImage = await this.contentGeneratorService.generateImage({
      prompt: content.cardTwoImage,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateFiveContent(
    dto: AboutContentDto,
  ): Promise<AboutFiveContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateAbout(
      dto,
      AboutVariation.ABOUT_FIVE,
    )) as AboutFiveContent;

    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateSixContent(
    dto: AboutContentDto,
  ): Promise<AboutSixContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateAbout(
      dto,
      AboutVariation.ABOUT_SIX,
    )) as AboutSixContent;

    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    return content;
  }

  // @ConsumeTextGenerations(1, true)
  public async generateSevenContent(
    dto: AboutContentDto,
  ): Promise<AboutSevenContent> {
    const generator = await this.contentGeneratorService.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = (await generator.generateAbout(
      dto,
      AboutVariation.ABOUT_SEVEN,
    )) as AboutSevenContent;

    content.image = await this.contentGeneratorService.generateImage({
      prompt: content.image,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    return content;
  }
}
