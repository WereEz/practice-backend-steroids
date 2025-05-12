import {Module} from '@steroidsjs/nest/infrastructure/decorators/Module';
import coreModule from '@steroidsjs/nest-auth';
import {IAuthModuleConfig} from '@steroidsjs/nest-auth/infrastructure/config';
import {ModuleHelper} from '@steroidsjs/nest/infrastructure/helpers/ModuleHelper';
import {AuthController as BaseAuthController} from '@steroidsjs/nest-auth/infrastructure/controllers/AuthController';
import {join} from 'path';

@Module({
    ...coreModule,
    tables: [
        ...(coreModule.tables ?? []),
        ...ModuleHelper.importDir(join(__dirname, '/tables')),
    ],
    module: (config: IAuthModuleConfig) => {
        if (!coreModule.module) {
            throw new Error('coreModule.module is not defined');
        }
        const module = coreModule.module(config);
        return {
            ...module,
            imports: [
                ...(module.imports ?? []),
            ],
            controllers: [
                ...(module.controllers ?? []).filter(controller => controller !== BaseAuthController),
            ],
            providers: [
                ...(module.providers ?? []),
            ],
        };
    },
})
export class AuthModule {}
