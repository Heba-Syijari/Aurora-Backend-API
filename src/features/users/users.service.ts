import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IExtrnalAuthService } from 'src/auth/external/external-auth.interface';
import { IUserRepository } from 'src/datasource/repositories/user';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @Inject(IExtrnalAuthService)
    private readonly externalAuthService: IExtrnalAuthService,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const user = await this.userRepository.create({
        ...createUserInput,
        metadata: {},
      });

      return user;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while creating the user');
    }
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      const user = await this.userRepository.update({
        ...updateUserInput,
        id,
      });

      return user;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while updating the user');
    }
  }

  async delete(id: string) {
    try {
      await this.userRepository.remove(id);

      await this.externalAuthService.deleteUser(id);

      return true;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while deleting the user');
    }
  }
}
