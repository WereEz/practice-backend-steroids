import { IValidator, IValidatorParams } from '@steroidsjs/nest/usecases/interfaces/IValidator';
import { FieldValidatorException } from '@steroidsjs/nest/usecases/exceptions/FieldValidatorException';
import { Inject, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../interfaces/IUserRepository';

export class UserEmailUniqueValidator implements IValidator {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository) { }

    async validate(dto: { email?: string; id?: number }, params?: IValidatorParams) {
        if (!dto.email) return;
        try {
            const existingUser = await this.userRepository.findByEmailOrPanic(dto.email);
            //Лишний console.log
            console.log(existingUser)

            if (existingUser && (!dto.id || existingUser.id !== dto.id)) {
                //Вынести в catch а тут выбрасывать NotFoundException
                throw new FieldValidatorException('Email уже занят');

            }
        } catch (e) {
            //Тут просто забираем то что пришло в виде error'а и передаем в FieldValidatorException
            if (e instanceof NotFoundException) {
            }
            else {
                throw e;
            }
        }
    }
}
