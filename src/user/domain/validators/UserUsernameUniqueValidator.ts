import { IValidator, IValidatorParams } from '@steroidsjs/nest/usecases/interfaces/IValidator';
import { UserSaveInputDto } from '../dtos/UserSaveInputDto';
import {FieldValidatorException} from '@steroidsjs/nest/usecases/exceptions/FieldValidatorException';
import { UserService } from '../services/UserService';

export class UserUsernameUniqueValidator implements IValidator {
    constructor(
            private readonly userServise: UserService) {}

    async validate(dto: UserSaveInputDto, params?: IValidatorParams) {
        const user = await this.userServise.existsByUsername(dto.username);
        if (user) {
            throw new FieldValidatorException('Никнейм уже занят');
        }
    }
}
