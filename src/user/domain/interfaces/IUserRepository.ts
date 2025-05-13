import {ICrudRepository} from '@steroidsjs/nest/usecases/interfaces/ICrudRepository';
import {UserModel} from '../models/UserModel';

export const UserRepositoryToken = 'UserRepositoryToken';

export interface IUserRepository extends ICrudRepository<UserModel> {
  findByEmail(email: string): Promise<UserModel | null>;
  existsByEmail(email: string): Promise<boolean>;
  existsByUsername(username: string): Promise<boolean>;
}