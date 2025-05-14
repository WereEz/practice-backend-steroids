import { ModuleHelper } from '@steroidsjs/nest/infrastructure/helpers/ModuleHelper';
import coreModule from '@steroidsjs/nest-auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@steroidsjs/nest/infrastructure/decorators/Module';
import { join } from 'path';
import { forwardRef } from '@nestjs/common';
import { UserModule } from '@steroidsjs/nest-modules/user/UserModule';
import { AuthLoginService } from '../domain/services/AuthLoginService';
import { AuthService } from '../domain/services/AuthService';
import { AuthLoginService as BaseAuthLoginService } from '@steroidsjs/nest-auth/domain/services/AuthLoginService';
import { IUserService } from '@steroidsjs/nest-modules/user/services/IUserService';
import { ISessionService } from '../domain/interfaces/ISessionService';
import { SessionService } from '../domain/services/SessionService';
import { IAuthModuleConfig } from '@steroidsjs/nest-auth/infrastructure/config';

@Module({
    ...coreModule,
    tables: ModuleHelper.importDir(join(__dirname, '/tables')),
    module: (config) => {
        if (!coreModule.module) {
            throw new Error('coreModule.module is not defined');
        }
        const module = coreModule.module(config);
        return {
            ...module,
            imports: [
                ...(module.imports ?? []),
                forwardRef(() => UserModule),
            ],

            controllers: ModuleHelper.importDir(join(__dirname, '/controllers')),

            providers: [
                {
                    provide: ISessionService,
                    useClass: SessionService,
                },
                {
                    provide: BaseAuthLoginService,
                    useClass: AuthLoginService,
                },
                ModuleHelper.provide(AuthService, [
                    IUserService,
                    BaseAuthLoginService,
                    ISessionService,
                ]),
                ModuleHelper.provide(AuthLoginService, [
                    ISessionService,
                    ConfigService,
                ]),

            ],
            exports: [
                AuthService
            ],
        };
    },
})
export class AuthModule { }
