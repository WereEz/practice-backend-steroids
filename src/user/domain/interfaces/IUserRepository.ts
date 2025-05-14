import { ICrudRepository } from '@steroidsjs/nest/usecases/interfaces/ICrudRepository';
import { UserModel } from '../models/UserModel';

export const IUserRepository = 'IUserRepository';

export interface IUserRepository extends ICrudRepository<UserModel> {
    findByEmailOrPanic(email: string): Promise<UserModel>;

    existsByUsername(username: string): Promise<boolean>;
}