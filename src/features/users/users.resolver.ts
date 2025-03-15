import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IsAdmin } from 'src/common/decorators';
import {
  CanCreateUser,
  CanDeleteUser,
  CanReadUser,
  CanUpdateUser,
} from 'src/common/decorators/permissions/user';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@IsAdmin()
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @CanCreateUser()
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @CanReadUser()
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @CanReadUser()
  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findById(id);
  }

  @CanUpdateUser()
  @Mutation(() => User)
  updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  // @CanDeleteUser()
  @Mutation(() => Boolean)
  deleteUser(@Args('id') id: string) {
    return this.usersService.delete(id);
  }
}
