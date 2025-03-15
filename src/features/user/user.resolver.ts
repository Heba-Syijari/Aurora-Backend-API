import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDecorator } from 'src/common/decorators';
import { User } from '../users/entities/user.entity';
import {
  UpdatePasswordInput,
  UpdatePasswordResponse,
  UpdatePreferencesInput,
  UpdatePreferencesOutput,
  UpdateProfileInput,
  UserUsageOutput,
} from './dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  updateProfile(
    @UserDecorator('id') userId: string,
    @Args('updateProfileInput')
    updateProfileInput: UpdateProfileInput,
  ) {
    return this.userService.updateProfile(userId, updateProfileInput);
  }

  @Mutation(() => UpdatePasswordResponse)
  updatePassword(
    @UserDecorator('email') userEmail: string,
    @Args('updatePasswordInput')
    updatePasswordInput: UpdatePasswordInput,
  ) {
    return this.userService.updatePassword(userEmail, updatePasswordInput);
  }

  @Mutation(() => UpdatePreferencesOutput)
  updatePreferences(
    @UserDecorator('id') userId: string,
    @Args('updatePreferencesInput')
    input: UpdatePreferencesInput,
  ) {
    return this.userService.updatePreferences(userId, input);
  }

  @Query(() => UserUsageOutput)
  getUserUsage(@UserDecorator('id') userId: string) {
    return this.userService.getUserUsage(userId);
  }
}
