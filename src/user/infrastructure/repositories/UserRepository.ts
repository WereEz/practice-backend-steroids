import { Injectable, NotFoundException } from '@nestjs/common';
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
    public async findByEmailOrPanic(email: string) {
        const user = await this.dbRepository.createQueryBuilder()
            .where([
                { email },
            ]).getOne()
        if (!user) {
            throw new NotFoundException(`Not found user by email: ${email}`);
        }

        return user;
    }

    public async existsByUsername(username: string): Promise<boolean> {
        return await this.dbRepository.exists({ where: { username } });
    }
}
