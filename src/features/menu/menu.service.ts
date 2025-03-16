import { Inject, Injectable } from '@nestjs/common';
import { IMenuRepository } from 'src/datasource/repositories/menu';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';

@Injectable()
export class MenuService {
  constructor(
    @Inject(IMenuRepository)
    private readonly menuRepository: IMenuRepository,
  ) {}

  async create(input: CreateMenuInput) {
    return await this.menuRepository.create({ ...input });
  }

  async findAll(projectId: string) {
    return await this.menuRepository.findAll({ projectId });
  }

  async findOne(id: number) {
    return await this.menuRepository.findById(id);
  }

  async update(id: number, input: UpdateMenuInput) {
    return await this.menuRepository.update({
      id,
      ...input,
    });
  }

  async remove(id: number) {
    return await this.menuRepository.remove(id);
  }
}
