import { ModuleHelper } from '@steroidsjs/nest/infrastructure/helpers/ModuleHelper';
import coreModule from '@steroidsjs/nest-user';
import { ISessionService } from '@steroidsjs/nest-auth/domain/interfaces/ISessionService';
import { Module } from '@steroidsjs/nest/infrastructure/decorators/Module';
import { AuthModule } from '@steroidsjs/nest-modules/auth/AuthModule';
import { forwardRef } from '@nestjs/common';
import { join } from 'path';

import { UserService } from '../domain/services/UserService';
import { IUserRepository, UserRepositoryToken } from '../domain/interfaces/IUserRepository';
import { UserRepository } from './repositories/UserRepository';
import { IUserService, UserServiceToken } from '../domain/interfaces/IUserServise';
import { UserEmailUniqueCreateValidator } from '../domain/validators/email-unique-create.validator';
import { UserUsernameUniqueValidator } from '../domain/validators/username-unique.validator';

@Module({
    ...coreModule,
    tables: ModuleHelper.importDir(join(__dirname, '/tables')),
    module: (config) => {
        const module = coreModule.module(config);

        return {
            ...module,
            controllers: ModuleHelper.importDir(join(__dirname, '/controllers')),
            // imports: [
            //     forwardRef(() => AuthModule),
            // ],
            providers: [
                ...module.providers,
                {
                    provide: UserRepositoryToken,
                    useClass: UserRepository,
                },
                UserEmailUniqueCreateValidator,
                UserUsernameUniqueValidator,

                ModuleHelper.provide(UserService, UserServiceToken, [
                    UserRepositoryToken,
                    [UserEmailUniqueCreateValidator, UserUsernameUniqueValidator],
                ]),
            ],
            exports: [
                ...module.exports,
                UserServiceToken,
                UserRepositoryToken,
            ],
        };
    },
})
export class UserModule { }
