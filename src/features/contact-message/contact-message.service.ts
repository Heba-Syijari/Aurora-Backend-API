import { Inject, Injectable } from '@nestjs/common';
import { IContactMessageRepository } from 'src/datasource/repositories/contact-message';
import { RemoveContactMessageInput } from './dto/remove-contact-message.input';

@Injectable()
export class ContactMessageService {
  constructor(
    @Inject(IContactMessageRepository)
    private readonly contactMessageRepository: IContactMessageRepository,
  ) {}

  async findAll(projectId: string) {
    return await this.contactMessageRepository.findAll(projectId);
  }

  async remove(input: RemoveContactMessageInput) {
    return await this.contactMessageRepository.remove(
      input.id,
      input.projectId,
    );
  }
}
