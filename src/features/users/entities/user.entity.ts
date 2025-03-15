import { Field, ObjectType } from '@nestjs/graphql';
import { JSONScalar } from 'src/common/graphql/scalars';
import { Gender } from 'src/types';
import { UserPreferences } from './user-preferences.entity';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field(() => Boolean)
  verified: boolean;

  @Field()
  gender: Gender;

  @Field({ nullable: true })
  imagePath?: string;

  @Field(() => UserPreferences, { nullable: true })
  preferences?: UserPreferences;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => JSONScalar)
  metadata: any;
}
