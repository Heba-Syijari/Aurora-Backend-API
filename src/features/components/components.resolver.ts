import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ComponentType } from '@prisma/client';
import { ComponentService } from './components.service';
import { Component } from './entities/component.entity';

@Resolver(() => Component)
export class ComponentResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Query(() => Component, { name: 'component' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.componentService.findOne(id);
  }

  @Query(() => [Component], { name: 'components' })
  findAllForType(
    @Args('type', { type: () => String, nullable: true })
    type?: ComponentType,
  ) {
    return this.componentService.findAll(type);
  }
}
