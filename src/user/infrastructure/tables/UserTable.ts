import {TableFromModel} from '@steroidsjs/nest/infrastructure/decorators/TableFromModel';
import { UserModel } from 'src/user/domain/models/UserModel';


@TableFromModel(UserModel, 'user')
export class UserTable extends UserModel {}
