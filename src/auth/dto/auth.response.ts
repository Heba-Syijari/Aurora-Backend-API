import { Field, ObjectType } from '@nestjs/graphql';
import { UserRoleType } from 'src/types';

@ObjectType()
export class AuthUser {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  role?: UserRoleType;
}

@ObjectType()
export class AuthResponse {
  @Field(() => AuthUser)
  user: AuthUser;

  @Field()
  token: string;
}
