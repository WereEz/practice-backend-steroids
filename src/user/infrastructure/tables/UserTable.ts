import {TableFromModel} from '@steroidsjs/nest/infrastructure/decorators/TableFromModel';
import {IDeepPartial} from '@steroidsjs/nest/usecases/interfaces/IDeepPartial';
import {UserModel} from '@steroidsjs/nest-user/domain/models/UserModel';

@TableFromModel(UserModel, 'user')
export class UserTable implements IDeepPartial<UserModel> {}
