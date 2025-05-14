import { IValidator, IValidatorParams } from '@steroidsjs/nest/usecases/interfaces/IValidator';
import { FieldValidatorException } from '@steroidsjs/nest/usecases/exceptions/FieldValidatorException';
import { UserService } from '../services/UserService';
import { NotFoundException } from '@nestjs/common';

export class UserEmailUniqueValidator implements IValidator {
    constructor(
        private readonly userService: UserService) { }

    async validate(dto: { email?: string; id?: number }, params?: IValidatorParams) {
        if (!dto.email) return;
        try {
            const existingUser = await this.userService.findByEmailOrPanic(dto.email);
            if (existingUser && (!dto.id || existingUser.id !== dto.id)) {
                throw new FieldValidatorException('Email уже занят');

            }
        } catch (e) {
            if (e instanceof NotFoundException) {
            }
            throw e;

        }
    }
}