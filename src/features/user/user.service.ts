import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IExtrnalAuthService } from 'src/auth/external/external-auth.interface';
import { IProjectRepository } from 'src/datasource/repositories/project';
import { IUserRepository } from 'src/datasource/repositories/user';
import {
  UpdatePasswordInput,
  UpdatePasswordResponse,
  UpdatePreferencesInput,
  UpdatePreferencesOutput,
  UpdateProfileInput,
  UserUsageOutput,
} from './dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(IExtrnalAuthService)
    private readonly externalAuthService: IExtrnalAuthService,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
  ) {}

  public async updateProfile(id: string, input: UpdateProfileInput) {
    try {
      const user = await this.userRepository.update({ id, ...input });

      return user;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while updating the user');
    }
  }

  public async updatePassword(
    email: string,
    input: UpdatePasswordInput,
  ): Promise<UpdatePasswordResponse> {
    try {
      const success = await this.externalAuthService.changePassword({
        email,
        oldPassword: input.oldPassword,
        newPassword: input.newPassword,
      });

      return { success };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        err.message ?? "error while updating user's password",
      );
    }
  }

  public async updatePreferences(
    userId: string,
    input: UpdatePreferencesInput,
  ): Promise<UpdatePreferencesOutput> {
    try {
      const result = await this.userRepository.updateUserPreferences({
        userId,
        ...input,
      });

      return { success: !!result };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        err.message || 'error while updating user preferences',
      );
    }
  }

  public async getUserUsage(userId: string): Promise<UserUsageOutput> {
    const projectsCount = await this.projectRepository.count({ userId });

    return {
      projectsCount,
      hasOneProjectFreeTrial: projectsCount === 0,
    };
  }
}
