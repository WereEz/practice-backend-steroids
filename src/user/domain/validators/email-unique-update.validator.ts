import { Inject } from '@nestjs/common';
import { IValidator, IValidatorParams } from '@steroidsjs/nest/usecases/interfaces/IValidator';
import { FieldValidatorException } from '@steroidsjs/nest/usecases/exceptions/FieldValidatorException';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { IUserRepository, UserRepositoryToken } from '../interfaces/IUserRepository';



export class UserEmailUniqueUpdateValidator implements IValidator {
    constructor(
        @Inject(UserRepositoryToken)
        private readonly userRepository: IUserRepository) { }

    async validate(dto: UpdateUserDto, params?: IValidatorParams) {
        if (dto.email) {
            const existingUser = await this.userRepository.findByEmail(dto.email);
            if (existingUser && existingUser.id != dto.id) {
                throw new FieldValidatorException('Email уже занят');
            }
        }
    }
}
