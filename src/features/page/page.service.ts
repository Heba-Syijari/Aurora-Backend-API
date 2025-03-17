import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ComponentType } from '@prisma/client';
import { Component } from 'src/datasource/entities/component.entity';
import { Media } from 'src/datasource/entities/media.entity';
import { Project } from 'src/datasource/entities/project.entity';
import { IComponentRepository } from 'src/datasource/repositories/component';
import { IComponentPageRepository } from 'src/datasource/repositories/component-page';
import { IMenuRepository } from 'src/datasource/repositories/menu';
import { IPageRepository } from 'src/datasource/repositories/page';
import { IProjectRepository } from 'src/datasource/repositories/project';
import { needRecord } from 'src/utils/record';
import { ComponentsFactory } from '../components/components.factory';
import {
  AddPageComponentInput,
  ChangeComponentLayoutInput,
  CreatePageInput,
  DeletePageInput,
  RegeneratePageInput,
  SwapPageComponentsInput,
  UpdatePageComponentInput,
} from './dto';

@Injectable()
export class PageService {
  constructor(
    @Inject(IPageRepository)
    private readonly pageRepository: IPageRepository,
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
    @Inject(IMenuRepository)
    private readonly menuRepository: IMenuRepository,
    @Inject(IComponentPageRepository)
    private readonly componentPageRepository: IComponentPageRepository,
    @Inject(IComponentRepository)
    private readonly componentRepository: IComponentRepository,
    private readonly componentsFactory: ComponentsFactory,
  ) {}

  async findOne(pageId: number) {
    return await this.pageRepository.findById(pageId);
  }

  async createPage(input: CreatePageInput) {
    let components: {
      pageComponents: { id: number; data: any; order: number }[];
      components: Component[];
    };
    const project = await this.projectRepository.findOne({
      id: input.projectId,
    });
    if (input.sections && input.sections.length > 0) {
      try {
        components = await this.createPageComponents({ ...input, project });
      } catch (err) {
        console.log(err);
        throw new BadRequestException(err.message);
      }
    }
    const page = await this.pageRepository.create({
      title: input.title,
      description: input.description,
      projectId: input.projectId,
      components: components.pageComponents,
    });

    if (page && components.components.length > 0) {
      await this.menuRepository.createforHeadr({
        components: components.components,
        page,
        mainLanguage: project.mainLanguage,
      });
    }

    await this.menuRepository.create({
      pageId: page.id,
      label: page.title,
      projectId: page.projectId,
      place: 'footer',
    });
    return page;
  }

  async deletePage(input: DeletePageInput) {
    const delPage = await this.pageRepository.remove(
      input.pageId,
      input.projectId,
    );
    await this.menuRepository.deleteMenuForPage(input.projectId);
    return delPage;
  }

  async regeneratePage(input: RegeneratePageInput) {
    return new BadRequestException(`We don't give this method at now`);
    const page = await this.pageRepository.findOne(
      input.pageId,
      input.projectId,
    );
    const project = await this.projectRepository.findOne({
      id: input.projectId,
    });
    const components = await this.createPageComponents({
      title: page.title,
      description: page.description,
      projectId: page.projectId,
      project,
    });

    await this.pageRepository.update({
      pageId: page.id,
      title: page.title,
      description: page.description,
      components: components.pageComponents,
    });

    return true;
  }
  async createPageComponents(
    input: CreatePageInput & { project: Project },
  ): Promise<{
    pageComponents: { id: number; data: any; order: number }[];
    components: Component[];
  }> {
    const media = await this.projectRepository.getProjectMedia(input.projectId);
    const pageComponents: { id: number; data: any; order: number }[] = [];
    const components: Component[] = [];
    const componentPromises = input.sections.map(
      async ({ componentId, order }, index) => {
        const component = needRecord<Component>(
          await this.componentRepository.findById(componentId),
          new BadRequestException(
            `not found component with this ID: ${componentId}`,
          ),
        );
        if (
          component.type !== ComponentType.FOOTER &&
          component.type !== ComponentType.HERO
        ) {
          components.push(component);
        }
        const data = await this.generateComponentData({
          index,
          variation: component.name,
          type: component.type,
          project: input.project,
          media,
          generateAI: input.generateAI,
        });
        if (data) {
          pageComponents.push({ id: componentId, data, order });
        }
      },
    );

    await Promise.all(componentPromises);

    return { pageComponents, components };
  }

  private async generateComponentData(input: {
    type: ComponentType;
    variation: string;
    project: Project;
    media: Media[];
    index: number;
    generateAI?: boolean;
  }): Promise<any> {
    const componentFactory = this.componentsFactory.create(input.type);

    const componentVariation = componentFactory.create(input.variation);
    return await componentVariation.getData({
      userId: input.project.userId,
      mainLanguage: input.project.mainLanguage,
      purpose: input.project.purpose,
      description: input.project.description,
      media: input.media,
      audience: input.project.audience,
      generateAI: input.generateAI,
    });
  }

  async swapComponents(pageId: number, input: SwapPageComponentsInput) {
    const components = await this.componentPageRepository.findAll({
      pageId: pageId,
      ids: input.componentsIds,
    });

    if (components.length < 2) {
      throw new BadRequestException('cannot change component order');
    }

    const [component1, component2] = components;

    try {
      await Promise.all([
        this.componentPageRepository.update({
          id: component1.id,
          order: component2.order,
        }),
        this.componentPageRepository.update({
          id: component2.id,
          order: component1.order,
        }),
      ]);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while changing component order');
    }

    return true;
  }

  async updateComponent(pageId: number, input: UpdatePageComponentInput) {
    try {
      const component = await this.componentPageRepository.findById(input.id);
      if (component.component.type !== ComponentType.FOOTER)
        await this.componentPageRepository.update({
          id: input.id,
          data: input.data,
          pageId: pageId,
        });
      else
        await this.componentPageRepository.updatefooter(
          pageId,
          component.component.id,
          input.data,
        );
      return true;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while updating the component');
    }
  }

  async addComponent(
    pageId: number,
    input: AddPageComponentInput & { userId: string },
  ) {
    try {
      const basicComponent = await this.componentRepository.findById(
        input.componentId,
      );

      if (basicComponent.type === ComponentType.FOOTER && !input.regenerate)
        return new BadRequestException('you can not add Footer');

      await this.shiftComponentsOrder(input.order, 1);

      const project = await this.projectRepository.findOne(
        { pageId },
        { media: true },
      );

      const componentFactory = this.componentsFactory.create(
        basicComponent.type,
      );

      const componentVariation = componentFactory.create(basicComponent.name);

      const componentData = await componentVariation.getData({
        userId: input.userId,
        generateAI: input.generateAI,
        mainLanguage: project.mainLanguage,
        description: project.description,
        purpose: project.purpose,
        audience: project.audience,
        media: project.media || [],
      });

      if (!componentData) {
        throw new Error(
          'Your project description has no special times to generate a component for it.',
        );
      }

      const component = await this.componentPageRepository.create({
        pageId: pageId,
        componentId: input.componentId,
        order: input.order,
        data: componentData,
      });
      const page = await this.pageRepository.findById(pageId);

      const menu = await this.menuRepository.createforHeadr({
        components: [basicComponent],
        page,
        mainLanguage: project.mainLanguage,
      });

      return component;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        err.message || 'error while adding the component',
      );
    }
  }

  async removeComponent(pageId: number, componentId: number) {
    try {
      const component = await this.componentPageRepository.findById(
        componentId,
      );

      await this.shiftComponentsOrder(component.order, -1);

      const removedComponent = await this.componentPageRepository.remove({
        id: componentId,
        pageId,
      });

      await this.menuRepository.deleteMenuBySection(
        pageId,
        component.component.type,
      );

      return removedComponent;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while removing the component');
    }
  }

  private async shiftComponentsOrder(order: number, value: number) {
    try {
      await this.componentPageRepository.shiftOrder({ order, value });
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while shifting the order');
    }
  }

  async changeComponentLayout(
    pageId: number,
    userId: string,
    input: ChangeComponentLayoutInput,
  ) {
    try {
      const newComponent = await this.componentRepository.findById(
        input.componentId,
      );
      const oldComponent = await this.componentPageRepository.findById(
        input.id,
      );
      const project = await this.projectRepository.findOne(
        { pageId },
        { media: true },
      );

      const componentFactory = this.componentsFactory.create(newComponent.type);

      const componentVariation = componentFactory.create(newComponent.name);

      const componentData = await componentVariation.getData({
        userId: userId,
        generateAI: false,
        mainLanguage: project.mainLanguage,
        description: project.description,
        purpose: project.purpose,
        audience: project.audience,
        media: project.media || [],
      });

      if (!componentData) {
        throw new Error(
          'Your project description has no special times to generate a component for it.',
        );
      }
      if (newComponent.type !== ComponentType.FOOTER) {
        return await this.componentPageRepository.update({
          id: input.id,
          componentId: input.componentId,
          pageId,
          data: componentData,
        });
      } else {
        return await this.componentPageRepository.updateLeyoutfooter(
          input.id,
          project.id,
          oldComponent.componentId,
          input.componentId,
          componentData,
        );
      }
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while updating the component');
    }
  }

  private async isComponentExist(componentId: number): Promise<boolean> {
    try {
      const component = await this.componentRepository.findById(componentId);

      return !!component;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
