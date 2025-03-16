import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ImageModel } from 'src/common/enums';
import { IProjectRepository } from 'src/datasource/repositories/project';
import { IUserRepository } from 'src/datasource/repositories/user';
import { checkDomainAvailability } from 'src/utils/dns';
import { IPrivacyPoliceVariation } from '../components/factory/privacy-policy/types';
import { SubscriptionService } from '../subscription/subscription.service';
import { UserPreferences } from '../users/entities';
import {
  ContentGeneratorFactory,
  IContentGeneratorContract,
  IImageGeneratorContract,
  ImageGeneratorFactory,
} from './contracts';
import {
  BaseContentDto,
  EnhanceTextDto,
  FAQsContentDto,
  GenerateImageDto,
  GenerateTextDto,
  PostsContentDto,
  SuggestDomainNamesDto,
  SuggestLogoTextsDto,
} from './dto';
import { RegenerateTextInput } from './input';
import {
  BlogContent,
  ContentGenerationsType,
  FAQsContent,
  PostItem,
  PostsContent,
  PrivacyPolicyContent,
  SliderContent,
  WorkContent,
} from './types';

@Injectable()
export class ContentGeneratorService {
  private readonly logger = new Logger(ContentGeneratorService.name);

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly imageGeneratorFactory: ImageGeneratorFactory,
    private readonly contentGeneratorFactory: ContentGeneratorFactory,
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  // @ConsumeTextGenerations(1)
  public async suggestDomainNames({
    keyword,
    userId,
    userPreferences,
  }: SuggestDomainNamesDto): Promise<string[]> {
    const generator = await this.getContentGenerator(userId, userPreferences);

    const suggestedDomains = await generator.generateDomainNames(keyword);

    const availableDomains = (
      await Promise.all(
        suggestedDomains.map(async (name) => {
          return (await checkDomainAvailability(name)) ? name : '';
        }),
      )
    ).filter(Boolean);

    console.log({ availableDomains });

    return availableDomains;
  }

  // @ConsumeTextGenerations(1)
  public async enhanceText({
    text,
    userId,
    userPreferences,
  }: EnhanceTextDto): Promise<string> {
    const generator = await this.getContentGenerator(userId, userPreferences);
    return await generator.enhanceText(text);
  }

  // @ConsumeTextGenerations(1, true)
  public async suggestLogoTexts({
    keyword,
    userId,
    userPreferences,
  }: SuggestLogoTextsDto): Promise<string[]> {
    const generator = await this.getContentGenerator(userId, userPreferences);
    return await generator.generateLogoTexts(keyword);
  }

  // @ConsumeTextGenerations(1)
  public async generateText({
    text,
    userId,
    userPreferences,
  }: GenerateTextDto): Promise<string> {
    const generator = await this.getContentGenerator(userId, userPreferences);
    return await generator.generateText(text);
  }

  // @ConsumeTextGenerations(1)
  public async regenerateText(
    input: RegenerateTextInput & {
      userId: string;
      userPreferences?: UserPreferences;
    },
  ): Promise<string> {
    try {
      const dto = await this.constructBaseContentDto(input.projectId);

      const generator = await this.getContentGenerator(
        input.userId,
        input.userPreferences,
      );

      return await generator.regenerateText({
        ...dto,
        itemType: input.itemType,
        sectionType: input.sectionType,
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while re-generating the text');
    }
  }

  public async generateImage(dto: GenerateImageDto): Promise<string> {
    try {
      const url = await this.generateImageOnly(dto);
      return url;
    } catch (err) {
      this.logger.error(err);

      return `https://picsum.photos/200?random=${Math.round(
        Math.random() * 100,
      )}`;
    }
  }

  // @ConsumeImageGenerations(1, true)
  private async generateImageOnly({
    prompt,
    userId,
    userPreferences,
  }: GenerateImageDto): Promise<string> {
    const imageGenerator = await this.getImageGenerator(
      userId,
      userPreferences,
    );

    const imagePrompt = prompt || 'generate Islamic image';

    try {
      return await imageGenerator.create(imagePrompt);
    } catch (err) {
      this.logger.error(err);

      return await this.generateFallbackImage(imagePrompt);
    }
  }

  private async generateFallbackImage(
    prompt: string,
    count = 0,
  ): Promise<string> {
    if (count > 3) {
      throw new Error('Failed to generate image after 3 attempts');
    }

    try {
      const imageGenerator = await this.imageGeneratorFactory.create(
        ImageModel.DALLE_3,
      );

      return await imageGenerator.create(prompt);
    } catch (err) {
      this.logger.error(err);

      return await this.generateFallbackImage(prompt, count + 1);
    }
  }

  // @ConsumeTextGenerations(6, true)
  public async generatePosts(dto: PostsContentDto): Promise<PostsContent> {
    const generator = await this.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );

    const content = await generator.generatePosts(dto);

    const items = await Promise.all(
      content.items.map(async (item) => {
        item.image = await this.generateImage({
          prompt: item.imageAlt,
          userId: dto.userId,
          userPreferences: dto.userPreferences,
        });

        return item;
      }),
    );

    return { items };
  }

  // @ConsumeTextGenerations(1, true)
  public async generateBlog(dto: BaseContentDto): Promise<BlogContent> {
    const generator = await this.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );
    const content = await generator.generateBlog(dto);
    return content;
  }

  // @ConsumeTextGenerations(2)
  public async generatePost(dto: PostsContentDto): Promise<PostItem> {
    const generator = await this.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );

    const post = await generator.generatePost(dto);

    post.image = await this.generateImage({
      prompt: post.imageAlt,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });

    return post;
  }
  // @ConsumeTextGenerations(1, true)
  public async generateFAQsContent(dto: FAQsContentDto): Promise<FAQsContent> {
    const generator = await this.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );

    return await generator.generateFAQs(dto);
  }

  // @ConsumeTextGenerations(1, true)
  public async generatePrivacyPolicyContent(
    dto: BaseContentDto,
    variation: IPrivacyPoliceVariation,
  ): Promise<PrivacyPolicyContent> {
    const generator = await this.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );

    return await generator.generatePrivacyPolicy(dto, variation);
  }

  // @ConsumeTextGenerations(1, true)
  public async generateWorkContent(dto: BaseContentDto): Promise<WorkContent> {
    const generator = await this.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );

    return await generator.generateWork(dto);
  }

  // @ConsumeTextGenerations(1, true)
  public async generateSliderContent(
    dto: BaseContentDto,
  ): Promise<SliderContent> {
    const generator = await this.getContentGenerator(
      dto.userId,
      dto.userPreferences,
    );

    const content = await generator.generateSlider(dto);
    content.image1 = await this.generateImage({
      prompt: content.image1,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    content.image2 = await this.generateImage({
      prompt: content.image2,
      userId: dto.userId,
      userPreferences: dto.userPreferences,
    });
    return content;
  }

  private async constructBaseContentDto(
    projectId: string,
  ): Promise<BaseContentDto> {
    const project = await this.projectRepository.findOne({
      id: projectId,
    });

    return {
      description: project.description,
      purpose: project.purpose,
      audience: project.audience,
      userId: project.userId,
      // contentCategories,
    };
  }

  async getContentGenerator(
    userId: string,
    userPreferences?: UserPreferences,
  ): Promise<IContentGeneratorContract> {
    let textModel = userPreferences?.textModel;

    if (!textModel) {
      ({ textModel } = await this.getUserPreferences(userId));
    }

    return this.contentGeneratorFactory.create(textModel);
  }

  private async getImageGenerator(
    userId: string,
    userPreferences?: UserPreferences,
  ): Promise<IImageGeneratorContract> {
    let imageModel = userPreferences?.imageModel;

    if (!imageModel) {
      ({ imageModel } = await this.getUserPreferences(userId));
    }
    // console.log(imageModel);
    return this.imageGeneratorFactory.create(imageModel);
  }

  async getUserPreferences(userId: string) {
    const user = await this.userRepository.findOne(
      { id: userId },
      { relations: { preferences: true } },
    );

    return user.preferences;
  }

  protected async getUserSubscription(userId: string) {
    return await this.subscriptionService.findLastActive(userId);
  }

  protected async subtractContentGenerations(
    userId: string,
    type: ContentGenerationsType,
    amount: number,
  ): Promise<boolean> {
    if (type === 'image') {
      return await this.subscriptionService.subtractImageGenerations(
        userId,
        amount,
      );
    }

    if (type === 'text') {
      return await this.subscriptionService.subtractTextGenerations(
        userId,
        amount,
      );
    }

    return false;
  }

  protected async isUserHasFreeTrial(userId: string): Promise<boolean> {
    const projectsCount = await this.projectRepository.count({
      userId,
    });

    // TODO: this should be handled as a free plan instead of this
    return projectsCount === 1; // here the count should 1 because the project
  }
}
