import {ExtendField} from '@steroidsjs/nest/infrastructure/decorators/fields';
import {Validator} from '@steroidsjs/nest/usecases/validators';
import { UserModel } from '../models/UserModel';
import { UserEmailUniqueCreateValidator } from '../validators/email-unique-create.validator';
import { UserUsernameUniqueValidator } from '../validators/username-unique.validator';

export class UserSaveInputDto {
  @ExtendField(UserModel)
  @Validator(UserUsernameUniqueValidator)
  username: string;

  @ExtendField(UserModel)
  firstName: string;

  @ExtendField(UserModel)
  surname: string;

  @ExtendField(UserModel)
  @Validator(UserEmailUniqueCreateValidator)
  email: string;

  @ExtendField(UserModel)
  passwordHash: string;

  @ExtendField(UserModel)
  bio?: string;

  @ExtendField(UserModel)
  avatarId?: number;
}
