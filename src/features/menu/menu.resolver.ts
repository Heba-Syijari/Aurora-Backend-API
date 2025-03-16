import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Menu } from 'src/datasource/entities/menu.entity';
import { ProjectOwnerGuard } from 'src/common/guards/resources';
import { MenuService } from './menu.service';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { DeleteMenuInput } from './dto/delete-menu.input';

@Resolver(() => Menu)
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Mutation(() => Menu)
  @UseGuards(ProjectOwnerGuard)
  createMenu(@Args('createMenuInput') createMenuInput: CreateMenuInput) {
    return this.menuService.create(createMenuInput);
  }

  @Query(() => [Menu], { name: 'getProjectMenus' })
  @UseGuards(ProjectOwnerGuard)
  findAll(@Args('projectId') projectId: string) {
    return this.menuService.findAll(projectId);
  }

  @Query(() => Menu, { name: 'menu' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.menuService.findOne(id);
  }

  @Mutation(() => Menu)
  @UseGuards(ProjectOwnerGuard)
  updateMenu(@Args('updateMenuInput') updateMenuInput: UpdateMenuInput) {
    return this.menuService.update(updateMenuInput.id, updateMenuInput);
  }

  @Mutation(() => Menu)
  @UseGuards(ProjectOwnerGuard)
  deleteMenu(@Args('deleteMenuInput') deleteMenuInput: DeleteMenuInput) {
    return this.menuService.remove(deleteMenuInput.id);
  }
}
