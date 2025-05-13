import { UserModel } from '../models/UserModel';
import { GetUsersDto } from '../dtos/get-users.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

export const UserServiceToken = 'UserServiceToken';

export interface IUserService {
    checkUserExistsById(id: number): Promise<void>;

    getUserById(id: number): Promise<UserModel>;

    updateUser(id: number, dto: UpdateUserDto): Promise<UserModel>;

    softDeleteUserById(id: number): Promise<void>;

    getFilteredUsers(dto: GetUsersDto): Promise<UserModel[]>;

    createUser(dto: CreateUserDto): Promise<UserModel>;
}
