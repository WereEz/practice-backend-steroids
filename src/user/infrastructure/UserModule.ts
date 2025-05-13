import { ModuleHelper } from '@steroidsjs/nest/infrastructure/helpers/ModuleHelper';
import coreModule from '@steroidsjs/nest-user';
import { Module } from '@steroidsjs/nest/infrastructure/decorators/Module';
import { forwardRef } from '@nestjs/common';
import { join } from 'path';

import { UserService } from '../domain/services/UserService';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { UserRepository } from './repositories/UserRepository';
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
                    provide: IUserRepository,
                    useClass: UserRepository,
                },
                UserEmailUniqueCreateValidator,
                UserUsernameUniqueValidator,
                
                ModuleHelper.provide(UserService, [
                    IUserRepository,
                    [UserEmailUniqueCreateValidator, UserUsernameUniqueValidator],
                ]),
            ],
            exports: [
                ...module.exports,
                IUserRepository,
            ],
        };
    },
})
export class UserModule { }
