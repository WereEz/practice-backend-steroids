import {ConsoleApplication} from '@steroidsjs/nest/infrastructure/applications/console/ConsoleApplication';
import {Module} from '@steroidsjs/nest/infrastructure/decorators/Module';
import baseConfig from '@steroidsjs/nest/infrastructure/applications/console/config';
import {IConsoleAppModuleConfig} from '@steroidsjs/nest/infrastructure/applications/console/IConsoleAppModuleConfig';
import {AuthModule} from './auth/infrastructure/AuthModule';
import {FileModule} from './file/infrastructure/FileModule';
import {UserModule} from './user/infrastructure/UserModule';
import {NotifierModule} from './notifier/infrastructure/NotifierModule';
import {InitModule} from './init/infrastructure/InitModule';

@Module({
    ...baseConfig,
    module: (config: IConsoleAppModuleConfig) => {
        const module = baseConfig.module(config);
        return {
            ...module,
            imports: [
                ...module.imports,
                AuthModule,
                FileModule,
                UserModule,
                NotifierModule,
                InitModule,
            ],
        };
    },
})
export class AppModule {
}

(new ConsoleApplication()).start();
