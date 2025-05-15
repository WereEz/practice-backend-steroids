import { Inject } from '@nestjs/common';
import { AuthTokenPayloadDto } from '@steroidsjs/nest-auth/domain/dtos/AuthTokenPayloadDto';
import { DataMapper } from '@steroidsjs/nest/usecases/helpers/DataMapper';
import { IValidator } from '@steroidsjs/nest/usecases/interfaces/IValidator';
import { UserSaveInputDto } from '../../../user/domain/dtos/UserSaveInputDto';
import { UserModel } from '../../../user/domain/models/UserModel';
import { UserService } from '../../../user/domain/services/UserService';
import { IUserService } from '../../../user/domain/interfaces/IUserServise';
import { AuthLoginService } from './AuthLoginService';

export class AuthService {
    constructor(
        @Inject(IUserService)
        private userService: UserService,
        @Inject(AuthLoginService)
        private authLoginService: AuthLoginService,
        public validators: IValidator[],
    ) {
    }

    createTokenPayload(user: UserModel): AuthTokenPayloadDto {
        return DataMapper.create<AuthTokenPayloadDto>(AuthTokenPayloadDto, {
            id: user.id,
        });
    }

    async registration(registrationDto: UserSaveInputDto) {
        const user = await this.userService.createUserOrPanic(registrationDto);
        return await this.authLoginService.generateTokens(user.id, this.createTokenPayload(user));
    }
}
