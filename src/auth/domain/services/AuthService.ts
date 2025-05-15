import { Inject } from '@nestjs/common';
import { AuthTokenPayloadDto } from '@steroidsjs/nest-auth/domain/dtos/AuthTokenPayloadDto';
// import {AuthLoginService as BaseAuthLoginService} from '@steroidsjs/nest-auth/domain/services/AuthLoginService';
import { DataMapper } from '@steroidsjs/nest/usecases/helpers/DataMapper';
import { ValidationHelper } from '@steroidsjs/nest/usecases/helpers/ValidationHelper';
import { IValidator } from '@steroidsjs/nest/usecases/interfaces/IValidator';
import { Context } from '../../infrastructure/decorators/Context';
import { UserSaveInputDto } from '../../../user/domain/dtos/UserSaveInputDto';
import { UserModel } from '../../../user/domain/models/UserModel';
import { UserService } from '../../../user/domain/services/UserService';
import { IUserService } from '../../../user/domain/interfaces/IUserServise';
import { ContextDto } from '../dtos/ContextDto';
import JwtTokenStatusEnum from '../enums/JwtTokenStatusEnum';
import { ISessionService } from '../interfaces/ISessionService';
import { AuthLoginService } from './AuthLoginService';

export class AuthService {
    constructor(
        @Inject(IUserService)
        private userService: UserService,
        @Inject(AuthLoginService)
        private authLoginService: AuthLoginService,
        //это не используется
        private sessionService: ISessionService,
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

        //console.log удалить
        console.log(this.authLoginService)



        //должно возвращать return DataMapper.create<TokensSchema>(...)
        return await this.authLoginService.generateTokens(user.id, this.createTokenPayload(user));
    }
}
