import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityNotFoundException } from 'src/common/exceptions';
import { ContactMessage } from 'src/datasource/entities/contact-message.entity';
import {
  IContactMessageRepository,
  ICreateContactMessagePayload,
  IUpdateContactMessagePayload,
} from './icontact-message.repository';

@Injectable()
export class ContactMessageRepository implements IContactMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(projectId: string): Promise<ContactMessage[]> {
    const contactMessages = await this.prisma.contactMessage.findMany({
      where: { projectId },
    });

    return contactMessages;
  }

  async findById(id: number): Promise<ContactMessage> {
    const contactMessage = await this.prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!contactMessage) {
      throw new EntityNotFoundException('contact message');
    }

    return contactMessage;
  }

  async create(payload: ICreateContactMessagePayload): Promise<ContactMessage> {
    const contactMessage = await this.prisma.contactMessage.create({
      data: { ...payload },
    });

    return contactMessage;
  }

  async update(payload: IUpdateContactMessagePayload): Promise<ContactMessage> {
    const contactMessage = await this.prisma.contactMessage.update({
      where: { id: payload.id },
      data: { ...payload },
    });

    return contactMessage;
  }

  async remove(id: number, projectId: string): Promise<ContactMessage> {
    const contactMessage = await this.prisma.contactMessage.delete({
      where: { id, projectId },
    });

    return contactMessage;
  }
}
