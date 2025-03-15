import { User as UserModel, UserPreferences } from '@prisma/client';
import { ImageModel, TextModel } from 'src/common/enums';
import { User } from 'src/features/users/entities';

export class UserMapper {
  static fromDB(model: UserModel & { preferences?: UserPreferences }): User {
    return {
      ...model,
      ...(model.preferences && {
        preferences: {
          ...model.preferences,
          textModel: model.preferences.textModel as TextModel,
          imageModel: model.preferences.imageModel as ImageModel,
        },
      }),
    };
  }
}
