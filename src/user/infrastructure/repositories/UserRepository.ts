import { Injectable } from '@nestjs/common';
import { CrudRepository } from '@steroidsjs/nest/infrastructure/repositories/CrudRepository';
import { InjectRepository } from '@steroidsjs/nest-typeorm';
import { Repository } from '@steroidsjs/typeorm';
import { UserTable } from '../tables/UserTable';
import { UserModel } from 'src/user/domain/models/UserModel';
import { IUserRepository } from 'src/user/domain/interfaces/IUserRepository';


@Injectable()
export class UserRepository extends CrudRepository<UserModel> implements IUserRepository {
    protected modelClass = UserModel;
    constructor(
        @InjectRepository(UserTable)
        public dbRepository: Repository<UserTable>,
    ) {
        super();
    }
}
