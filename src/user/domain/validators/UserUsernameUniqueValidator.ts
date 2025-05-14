import { IValidator, IValidatorParams } from '@steroidsjs/nest/usecases/interfaces/IValidator';
import { UserSaveInputDto } from '../dtos/UserSaveInputDto';
import { FieldValidatorException } from '@steroidsjs/nest/usecases/exceptions/FieldValidatorException';
import { UserService } from '../services/UserService';
import { IUserRepository } from '../interfaces/IUserRepository';
import { Inject } from '@nestjs/common';

export class UserUsernameUniqueValidator implements IValidator {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository) { }
    async validate(dto: UserSaveInputDto, params?: IValidatorParams) {
        const user = await this.userRepository.existsByUsername(dto.username);
        if (user) {
            throw new FieldValidatorException('Никнейм уже занят');
        }
    }
}
