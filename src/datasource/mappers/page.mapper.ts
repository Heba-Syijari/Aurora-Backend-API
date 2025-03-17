import { Component, ComponentsPages, Page as PagePrisma } from '@prisma/client';
import { Page } from '../entities/page.entity';

type PageComponentModel = ComponentsPages & {
  component?: Component;
};

type PageModel = PagePrisma & {
  components?: PageComponentModel[];
};

export class PageMapper {
  static fromDB(page: PageModel): Page {
    return {
      ...page,
      components: page.components.map((component) => ({
        ...component,
        data: component.data,
      })),
    };
  }
}
