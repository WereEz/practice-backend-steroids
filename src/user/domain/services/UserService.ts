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
import { IValidator } from '@steroidsjs/nest/usecases/interfaces/IValidator';

@Injectable()
export class UserService extends CrudService<UserModel,
    UserSearchDto,
    UserSaveInputDto | UserModel> {
    protected modelClass = UserModel;
    constructor(
        protected repository: IUserRepository,
        public validators: IValidator[]
    ) {
        super();
    }

    public async softDeleteUserById(id: number): Promise<void> {
        await this.checkUserExistsByIdOrPanic(id);
        await this.softRemove(id);
    }

    private async checkUserExistsByIdOrPanic(id: number): Promise<void> {
        const exists = await this.repository.findOne({ id });
        if (!exists) {
            throw new NotFoundException(`Пользователь с ${id} не найден`);
        }
    }

    public async getUserByIdOrPanic(id: number): Promise<UserModel> {
        const user = await this.repository.findOne({ id });
        if (!user) {
            throw new NotFoundException(`Пользователь с ${id} не найден`);
        }
        return user;
    }

    public async updateUserOrPanic(id: number, dto: UpdateUserDto): Promise<UserModel> {
        const context = {}
        await ValidationHelper.validate(dto, context, this.validators);
        await this.checkUserExistsByIdOrPanic(id);
        await this.update(id, dto);
        return this.getUserByIdOrPanic(id);
    }



    public async getFilteredUsers(dto: UserSearchDto) {
        await this.validate(dto);
        const { query, page = 1, pageSize = 10 } = dto;
        const skip = (page - 1) * pageSize;


        const searchQuery = this.createQuery().andFilterWhere([
                'or',
                ['ilike', 'username', query],
                ['ilike', 'firstName', query],
                ['ilike', 'surname', query],
            ]).offset(skip)
            .limit(pageSize);

        
        return (await this.repository.search(dto,searchQuery)).items

    }

    public async createUserOrPanic(dto: UserSaveInputDto): Promise<UserModel> {
        const context = {}
        await ValidationHelper.validate(dto, context, this.validators);
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
    private async getPasswordHash(password: string) {
        return await bcrypt.hash(password, 5);
    }

}