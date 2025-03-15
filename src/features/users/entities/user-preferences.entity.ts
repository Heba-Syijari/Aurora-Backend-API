import { Field, ObjectType } from '@nestjs/graphql';
import { ImageModel, TextModel } from 'src/common/enums';

@ObjectType()
export class UserPreferences {
  @Field()
  userId: string;

  @Field()
  imageModel: ImageModel;

  @Field()
  textModel: TextModel;
}
