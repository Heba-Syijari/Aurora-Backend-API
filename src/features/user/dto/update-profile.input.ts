import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/features/users/dto/create-user.input';

@InputType()
export class UpdateProfileInput extends PartialType(
  OmitType(CreateUserInput, ['id', 'email']),
) {}
