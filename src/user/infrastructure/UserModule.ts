import { ModuleHelper } from '@steroidsjs/nest/infrastructure/helpers/ModuleHelper';
import coreModule from '@steroidsjs/nest-user';
import { Module } from '@steroidsjs/nest/infrastructure/decorators/Module';
import { forwardRef } from '@nestjs/common';
import { join } from 'path';
import { UserService } from '../domain/services/UserService';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { UserRepository } from './repositories/UserRepository';
import { UserEmailUniqueValidator } from '../domain/validators/UserEmailUniqueValidator';
import { UserUsernameUniqueValidator } from '../domain/validators/UserUsernameUniqueValidator';
import { IUserService } from '../domain/interfaces/IUserServise';

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
                // UserEmailUniqueValidator,
                // UserUsernameUniqueValidator,

                ModuleHelper.provide(UserService, IUserService, [
                    IUserRepository,
                    // [UserEmailUniqueValidator, UserUsernameUniqueValidator],
                ]),
                ModuleHelper.provide(UserEmailUniqueValidator, [
                    IUserService,
                ]),
                ModuleHelper.provide(UserUsernameUniqueValidator, [
                    IUserService,
                ]),
            ],
            exports: [
                ...module.exports,
                IUserService,
                IUserRepository,
            ],
        };
    },
})
export class UserModule { }
