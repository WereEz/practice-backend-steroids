import { Inject } from '@nestjs/common';
import { ValidationHelper } from '@steroidsjs/nest/usecases/helpers/ValidationHelper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserModel } from '../models/UserModel';
import { IUserRepository } from '../interfaces/IUserRepository';
import { GetUsersDto } from '../dtos/get-users.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserSaveInputDto } from '../dtos/create-user.dto';
import { CrudService } from '@steroidsjs/nest/usecases/services/CrudService';
import { DataMapper } from '@steroidsjs/nest/usecases/helpers/DataMapper';
import { UserSearchDto } from '../dtos/UserSearchDto';
import { IValidator } from '@steroidsjs/nest/usecases/interfaces/IValidator';

@Injectable()
export class UserService extends CrudService<UserModel,
    UserSearchDto,
    UserSaveInputDto | UserModel> {
    protected modelClass = UserModel;
    constructor(
        public userRepository: IUserRepository,
        public readonly validators: IValidator[],
    ) {
        super();
    }
    async softDeleteUserById(id: number): Promise<void> {
        await this.checkUserExistsById(id);
        await this.softRemove(id); // не работает
        // await this.userRepository.softRemove(id); // работает
    }
    async checkUserExistsById(id: number): Promise<void> {
        const exists = await this.userRepository.findOne({ id });
        if (!exists) {
            throw new NotFoundException(`Пользователь с ${id} не найден`);
        }
    }

    async getUserById(id: number): Promise<UserModel> {
        const user = await this.userRepository.findOne({ id });
        if (!user) {
            throw new NotFoundException(`Пользователь с ${id} не найден`);
        }
        return user;
    }

    async updateUser(id: number, dto: UpdateUserDto): Promise<UserModel> {
        await this.checkUserExistsById(id);
        console.log(await this.getUserById(id))
        const model = DataMapper.create<UserModel>(UserModel, dto);
        await this.userRepository.update(id, model);
        return this.getUserById(id);
    }



    async getFilteredUsers(dto: GetUsersDto): Promise<UserModel[]> {
        const { query, page = 1, limit = 10 } = dto;
        const offset = (page - 1) * limit;

        const filters = query
            ? { $or: [{ fullName: { $ilike: `%${query}%` } }, { username: { $ilike: `%${query}%` } }] }
            : {};

        return this.userRepository.findMany({
            where: filters,
            limit,
            offset,
        });
    }

    async createUser(dto: UserSaveInputDto): Promise<UserModel> {
        // const dto.passwordHash = await password.passwordHash; // add hash
        const context = {}
        await ValidationHelper.validate(dto, context, this.validators);
        console.log(dto)
        const model = DataMapper.create<UserModel>(UserModel, dto);
        console.log(model)
        return this.userRepository.save(model);
    }
}