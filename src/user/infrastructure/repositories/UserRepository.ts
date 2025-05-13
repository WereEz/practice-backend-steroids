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

    async findByEmail(email: string): Promise<UserModel | null> {
        const user = await this.dbRepository.findOne({ where: { email } });
        return user ? this.entityToModel(user) : null;
    }

    async existsByEmail(email: string): Promise<boolean> {
        return await this.dbRepository.exists({ where: { email } });
    }

    async existsByUsername(username: string): Promise<boolean> {
        return await this.dbRepository.exists({ where: { username } });
    }
}
