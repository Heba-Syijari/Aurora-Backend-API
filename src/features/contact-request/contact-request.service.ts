import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IContactRequestRepository } from 'src/datasource/repositories/contact-request';
import { CreateContactRequestInput, UpdateContactRequestInput } from './dto';
import { NOTIFICATION_EVENTS } from '../notification/events/constants';
import {
  AdminNotificationCreatedEvent,
  SuperAdminNotificationCreatedEvent,
} from '../notification/events';
import { IAdminRepository } from 'src/datasource/repositories/admin';
import { ContactRequest } from 'src/datasource/entities/contact-request.entity';

@Injectable()
export class ContactRequestService {
  constructor(
    @Inject(IContactRequestRepository)
    private readonly contactRequestRepository: IContactRequestRepository,
    @Inject(IAdminRepository)
    private readonly adminRepository: IAdminRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(input: CreateContactRequestInput) {
    try {
      const contactRequest = await this.contactRequestRepository.create(input);

      const event = new SuperAdminNotificationCreatedEvent(
        'New contact request arrived',
        `We have an new contact request from ${contactRequest.email}`,
      );

      this.eventEmitter.emit(
        NOTIFICATION_EVENTS.SUPER_ADMIN_NOTIFICATION_CREATED,
        event,
      );

      return contactRequest;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new BadRequestException('error while creating the contact request');
    }
  }

  async findAll(filter: { adminId: string }) {
    if (filter.adminId) {
      const admin = await this.adminRepository.findById(filter.adminId);

      return await this.contactRequestRepository.findAll(
        admin.role?.isSuperAdmin ? {} : { assigneeId: admin.id },
      );
    }

    return [];
  }

  async findOne(id: number) {
    return await this.contactRequestRepository.findById(id);
  }

  async update(input: UpdateContactRequestInput) {
    try {
      const contactRequest = await this.contactRequestRepository.update(input);

      if (contactRequest.assigneeId && contactRequest.status === input.status) {
        this.sendStatusChangedNotification(contactRequest);
      } else if (contactRequest.assigneeId === input.assigneeId) {
        this.sendAssigneeChangedNotification(contactRequest);
      }

      return contactRequest;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new BadRequestException('error while updating the contact request');
    }
  }

  private sendStatusChangedNotification(contactRequest: ContactRequest) {
    const event = new AdminNotificationCreatedEvent(
      'Contact request status changed',
      `The contact request #${contactRequest.id} status is ${contactRequest.status}`,
      contactRequest.assigneeId,
    );

    this.eventEmitter.emit(
      NOTIFICATION_EVENTS.ADMIN_NOTIFICATION_CREATED,
      event,
    );
  }

  private sendAssigneeChangedNotification(contactRequest: ContactRequest) {
    const event = new AdminNotificationCreatedEvent(
      'Contact request assignee changed',
      `The contact request #${contactRequest.id} is assigned to you now.`,
      contactRequest.assigneeId,
    );

    this.eventEmitter.emit(
      NOTIFICATION_EVENTS.ADMIN_NOTIFICATION_CREATED,
      event,
    );
  }

  async remove(id: number) {
    return await this.contactRequestRepository.remove(id);
  }
}
