import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubscriptionGuard } from 'src/common/guards';
import { ProjectOwnerGuard } from 'src/common/guards/resources';
import { CreateMediaInput } from './dto/create-media.input';
import { DeleteMediaInput } from './dto/delete-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
import { Media } from './entities/media.entity';
import { MediaService } from './media.service';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Mutation(() => Media)
  // @UseGuards(SubscriptionGuard, ProjectOwnerGuard)
  createMedia(@Args('createMediaInput') input: CreateMediaInput) {
    return this.mediaService.create(input);
  }

  @Query(() => [Media], { name: 'getProjectMedia' })
  @UseGuards(ProjectOwnerGuard)
  findAll(@Args('projectId') projectId: string) {
    return this.mediaService.findAll(projectId);
  }

  @Query(() => Media, { name: 'media' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mediaService.findOne(id);
  }

  @Mutation(() => Media)
  // @UseGuards(SubscriptionGuard, ProjectOwnerGuard)
  updateMedia(@Args('updateMediaInput') input: UpdateMediaInput) {
    return this.mediaService.update(input.id, input);
  }

  @Mutation(() => Media)
  // @UseGuards(SubscriptionGuard, ProjectOwnerGuard)
  deleteMedia(@Args('deleteMediaInput') input: DeleteMediaInput) {
    return this.mediaService.remove(input.id);
  }
}
