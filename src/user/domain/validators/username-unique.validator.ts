import {Inject} from '@nestjs/common';
import { IValidator, IValidatorParams } from '@steroidsjs/nest/usecases/interfaces/IValidator';
import { CreateUserDto } from '../dtos/create-user.dto';
import {FieldValidatorException} from '@steroidsjs/nest/usecases/exceptions/FieldValidatorException';
import { IUserRepository, UserRepositoryToken } from '../interfaces/IUserRepository';



export class UserUsernameUniqueValidator implements IValidator {
    constructor(
            @Inject(UserRepositoryToken)
            private readonly userRepository: IUserRepository) {}

    async validate(dto: CreateUserDto, params?: IValidatorParams) {
        const user = await this.userRepository.existsByUsername(dto.username);
        if (user) {
            throw new FieldValidatorException('Никнейм уже занят');
        }
    }
}
