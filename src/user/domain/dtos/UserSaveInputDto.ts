import { ExtendField, StringField } from '@steroidsjs/nest/infrastructure/decorators/fields';
import { Validator } from '@steroidsjs/nest/usecases/validators';
import { UserModel } from '../models/UserModel';
import { UserEmailUniqueValidator } from '../validators/UserEmailUniqueValidator';
import { UserUsernameUniqueValidator } from '../validators/UserUsernameUniqueValidator';

export class UserSaveInputDto {
  @ExtendField(UserModel)
  @Validator(UserUsernameUniqueValidator)
  username: string;

  @ExtendField(UserModel)
  firstName: string;

  @ExtendField(UserModel)
  surname: string;

  @ExtendField(UserModel)
  @Validator(UserEmailUniqueValidator)
  email: string;

  @StringField({
    label: 'Пароль',
  })
  password: string;

  @ExtendField(UserModel)
  bio?: string;

  @ExtendField(UserModel)
  avatarId?: number;
}
