import { Menu as MenuModel, Page as PageModel } from '@prisma/client';
import { Menu } from '../entities/menu.entity';

export class MenuMapper {
  static fromDB(menu: MenuModel & { page?: PageModel }): Menu {
    return {
      ...menu,
      pageSlug: menu.page?.slug,
    };
  }
}
