import { Inject, Injectable } from '@nestjs/common';
import { ComponentType } from '@prisma/client';
import { IComponentRepository } from 'src/datasource/repositories/component';

@Injectable()
export class ComponentService {
  constructor(
    @Inject(IComponentRepository)
    private readonly componentRepository: IComponentRepository,
  ) {}

  async findOne(componentId: number) {
    return await this.componentRepository.findById(componentId);
  }

  async findAll(type: ComponentType) {
    return await this.componentRepository.FindAllFilter(type);
  }
}
