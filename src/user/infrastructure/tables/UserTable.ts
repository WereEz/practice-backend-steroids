import {TypeOrmTableFromModel} from '@steroidsjs/nest/infrastructure/decorators/typeorm/TypeOrmTableFromModel';
import { UserModel } from 'src/user/domain/models/UserModel';


@TypeOrmTableFromModel(UserModel, 'user')
export class UserTable extends UserModel {}
