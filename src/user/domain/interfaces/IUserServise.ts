import { UserModel } from '../models/UserModel';
import { UserSearchDto } from '../dtos/UserSearchDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { UserSaveInputDto } from '../dtos/UserSaveInputDto';

export const IUserService = 'IUserService';

export interface IUserService {
    checkUserExistsByIdOrPanic(id: number): Promise<void>;

    getUserByIdOrPanic(id: number): Promise<UserModel>;

    updateUserOrPanic(id: number, dto: UpdateUserDto): Promise<UserModel>;

    softDeleteUserById(id: number): Promise<void>;

    getFilteredUsers(dto: UserSearchDto): Promise<UserModel[]>;

    createUserOrPanic(dto: UserSaveInputDto): Promise<UserModel>;

    findByEmailOrPanic(email: string): Promise<UserModel>;

    existsByUsername(username: string): Promise<boolean>;

    getPasswordHash(password: string): Promise<string>;
}
