import {
  ComponentOnPage,
  CreateComponentPageDto,
  FindAllFilterDto,
  RemoveComponentPageDto,
  ShiftOrderFilterDto,
  UpdateComponentPageDto,
} from 'src/datasource/dto/component-page';

export interface IComponentPageRepository {
  findAll(filter: FindAllFilterDto): Promise<ComponentOnPage[]>;

  findById(id: number): Promise<ComponentOnPage>;

  create(input: CreateComponentPageDto): Promise<ComponentOnPage>;

  update(input: UpdateComponentPageDto): Promise<ComponentOnPage>;

  remove(input: RemoveComponentPageDto): Promise<ComponentOnPage>;

  shiftOrder(input: ShiftOrderFilterDto): Promise<number>;

  updatefooter(pageId: number, componentId: number, newData: any);

  updateLeyoutfooter(
    id:number,
    projectId: string,
    oldComponentId: number,
    newComponentId: number,
    data: any,
  ): Promise<ComponentOnPage>;
}

export const IComponentPageRepository = Symbol('IComponentPageRepository');
