import { ExtendField } from '@steroidsjs/nest/infrastructure/decorators/fields';
import { Validator } from '@steroidsjs/nest/usecases/validators';
import { UserModel } from '../models/UserModel';
import { UserEmailUniqueUpdateValidator } from '../validators/email-unique-update.validator';

export class UpdateUserDto {
  @ExtendField(UserModel)
  id: number;

  @ExtendField(UserModel)
  firstName?: string;

  @ExtendField(UserModel)
  surname?: string;

  @ExtendField(UserModel)
  @Validator(UserEmailUniqueUpdateValidator)
  email?: string;

  @ExtendField(UserModel)
  bio?: string;
}
