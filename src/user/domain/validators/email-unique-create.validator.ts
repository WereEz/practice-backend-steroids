import {Inject} from '@nestjs/common';
import { IValidator, IValidatorParams } from '@steroidsjs/nest/usecases/interfaces/IValidator';
import { UserSaveInputDto } from '../dtos/create-user.dto';
import {FieldValidatorException} from '@steroidsjs/nest/usecases/exceptions/FieldValidatorException';
import { IUserRepository } from '../interfaces/IUserRepository';



export class UserEmailUniqueCreateValidator implements IValidator {
    
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository) {}

    async validate(dto: UserSaveInputDto, params?: IValidatorParams) {
        dto.email
        const user = await this.userRepository.existsByEmail(dto.email);
        if (user) {
            throw new FieldValidatorException('Email уже занят');
        }
    }
}
