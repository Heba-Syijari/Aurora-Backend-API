import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityNotFoundException } from 'src/common/exceptions';
import { ContactRequest } from 'src/datasource/entities/contact-request.entity';
import {
  IContactRequestRepository,
  ICreateContactRequestPayload,
  IFindAllContactRequestsFilter,
  IUpdateContactRequestPayload,
} from './icontact-request.repository';

@Injectable()
export class ContactRequestRepository implements IContactRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filter?: IFindAllContactRequestsFilter,
  ): Promise<ContactRequest[]> {
    const contactRequests = await this.prisma.contactRequest.findMany({
      where: { ...(filter || {}) },
      orderBy: { createdAt: 'desc' },
      include: { assignee: true },
    });

    return contactRequests;
  }

  async findById(id: number): Promise<ContactRequest> {
    const contactRequest = await this.prisma.contactRequest.findUnique({
      where: { id },
      include: { assignee: true },
    });

    if (!contactRequest) {
      throw new EntityNotFoundException('contact request');
    }

    return contactRequest;
  }

  async create(payload: ICreateContactRequestPayload): Promise<ContactRequest> {
    const contactRequest = await this.prisma.contactRequest.create({
      data: { ...payload },
    });

    return contactRequest;
  }

  async update(payload: IUpdateContactRequestPayload): Promise<ContactRequest> {
    const contactRequest = await this.prisma.contactRequest.update({
      where: { id: payload.id },
      data: { ...payload },
    });

    if (!contactRequest) {
      throw new EntityNotFoundException('contact request');
    }

    return contactRequest;
  }

  async remove(id: number): Promise<ContactRequest> {
    const contactRequest = await this.prisma.contactRequest.delete({
      where: { id },
    });

    return contactRequest;
  }
}
