import { Inject, Injectable } from '@nestjs/common';
import { IMediaRepository } from 'src/datasource/repositories/media';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';

@Injectable()
export class MediaService {
  constructor(
    @Inject(IMediaRepository)
    private readonly mediaRepository: IMediaRepository,
  ) {}

  async create(input: CreateMediaInput) {
    return await this.mediaRepository.create({ ...input });
  }

  async findAll(projectId: string) {
    return await this.mediaRepository.findAll({ projectId });
  }

  async findOne(id: number) {
    return await this.mediaRepository.findById(id);
  }

  async update(id: number, input: UpdateMediaInput) {
    return await this.mediaRepository.update({ id, ...input });
  }

  async remove(id: number) {
    return await this.mediaRepository.remove(id);
  }
}
