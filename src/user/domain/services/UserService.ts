import { Inject } from '@nestjs/common';
import { ValidationHelper } from '@steroidsjs/nest/usecases/helpers/ValidationHelper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserModel } from '../models/UserModel';
import { IUserRepository } from '../interfaces/IUserRepository';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import * as bcrypt from 'bcrypt';
import { DataMapper } from '@steroidsjs/nest/usecases/helpers/DataMapper';
import { UserSaveInputDto } from '../dtos/UserSaveInputDto';
import { CrudService } from '@steroidsjs/nest/usecases/services/CrudService';
import { UserSearchDto } from '../dtos/UserSearchDto';
import { UserEmailUniqueValidator } from '../validators/UserEmailUniqueValidator';
import { UserUsernameUniqueValidator } from '../validators/UserUsernameUniqueValidator'

@Injectable()
export class UserService extends CrudService<UserModel,
    UserSearchDto,
    UserSaveInputDto | UserModel> {
    protected modelClass = UserModel;
    constructor(
        protected repository: IUserRepository,
        protected userEmailUniqueValidator: UserEmailUniqueValidator,
        protected userUsernameUniqueValidator: UserUsernameUniqueValidator,
    ) {
        super();
        this.validators = [
            userEmailUniqueValidator,
            userUsernameUniqueValidator,
        ];

    }

    public async findByEmailOrPanic(email: string) {
        const user = await this.createQuery()
            .where([
                { email: email },
            ])
            .one();
        if (!user) {
            throw new NotFoundException(`Not found user by email: ${email}`);
        }

        return user;
    }

    async existsByUsername(username: string): Promise<boolean> {
        const user = await this.createQuery()
            .where({ username })
            .one();

        return !!user;
    }

    async softDeleteUserById(id: number): Promise<void> {
        await this.checkUserExistsByIdOrPanic(id);
        await this.softRemove(id);
    }

    async checkUserExistsByIdOrPanic(id: number): Promise<void> {
        const exists = await this.repository.findOne({ id });
        if (!exists) {
            throw new NotFoundException(`Пользователь с ${id} не найден`);
        }
    }

    async getUserByIdOrPanic(id: number): Promise<UserModel> {
        const user = await this.repository.findOne({ id });
        if (!user) {
            throw new NotFoundException(`Пользователь с ${id} не найден`);
        }
        return user;
    }

    async updateUserOrPanic(id: number, dto: UpdateUserDto): Promise<UserModel> {
        // const context = {}
        // await ValidationHelper.validate(dto, context, this.validators);
        await this.checkUserExistsByIdOrPanic(id);
        await this.update(id, dto);
        return this.getUserByIdOrPanic(id);
    }



    async getFilteredUsers(dto: UserSearchDto) {
        await this.validate(dto);
        const { query, page = 1, pageSize = 10 } = dto;
        const skip = (page - 1) * pageSize;

        const queryBuilder = this.createQuery()
            .offset(skip)
            .limit(pageSize);

        if (query) {
            queryBuilder.where([
                'or',
                ['ilike', 'username', query],
                ['ilike', 'firstName', query],
                ['ilike', 'surname', query],
            ]);
        }

        return await queryBuilder.many();

    }

    async createUserOrPanic(dto: UserSaveInputDto): Promise<UserModel> {
        // const context = {}
        // await ValidationHelper.validate(dto, context, this.validators);
        if (dto.email) {
            dto.email = dto.email.toLowerCase();
        }

        const model = DataMapper.create<UserModel>(UserModel, {
            ...dto,
        });


        if (dto.password) {
            model.passwordHash = await this.getPasswordHash(dto.password);
        }

        return this.repository.create(model);
    }
    public async getPasswordHash(password: string) {
        return await bcrypt.hash(password, 5);
    }

}