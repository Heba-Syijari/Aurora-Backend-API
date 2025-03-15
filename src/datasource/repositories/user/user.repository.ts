import { Injectable } from '@nestjs/common';
import { ImageModel, TextModel } from 'src/common/enums';
import { EntityNotFoundException } from 'src/common/exceptions';
import { UserMapper } from 'src/datasource/mappers/user.mapper';
import { User } from 'src/features/users/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ICreateUserPayload,
  IFindOneFilter,
  IFindOneOptions,
  IUpdateUserPayload,
  IUpdateUserPreferencesPayload,
  IUserRepository,
} from './iuser.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { preferences: true },
    });

    if (!user) {
      throw new EntityNotFoundException('user');
    }

    return UserMapper.fromDB(user);
  }

  async findOne(
    filter: IFindOneFilter,
    options?: IFindOneOptions,
  ): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { ...filter },
      include: {
        ...(options?.relations?.preferences && { preferences: true }),
      },
    });

    if (!user) {
      throw new EntityNotFoundException('user');
    }

    return UserMapper.fromDB(user);
  }

  async create(payload: ICreateUserPayload): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...payload,
        preferences: {
          create: {
            imageModel: ImageModel.STABLE_DIFFUSION_XL_1_0,
            textModel: TextModel.MIXTRAL_8X7B,
          },
        },
      },
    });

    return user;
  }

  async update(payload: IUpdateUserPayload): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: payload.id },
      data: { ...payload },
    });

    return user;
  }

  async updateUserPreferences(
    payload: IUpdateUserPreferencesPayload,
  ): Promise<User> {
    const { userId, ...preferences } = payload;

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        preferences: {
          upsert: {
            create: { ...preferences },
            update: { ...preferences },
          },
        },
      },
    });

    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    return user;
  }
}
