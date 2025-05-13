import {RestApplication} from '@steroidsjs/nest/infrastructure/applications/rest/RestApplication';
import {IModule, Module} from '@steroidsjs/nest/infrastructure/decorators/Module';
import baseConfig from '@steroidsjs/nest/infrastructure/applications/rest/config';
import {IRestAppModuleConfig} from '@steroidsjs/nest/infrastructure/applications/rest/IRestAppModuleConfig';
import {ModuleMetadata} from '@nestjs/common';
import {UserModule} from './user/infrastructure/UserModule';
import {AuthModule} from './auth/infrastructure/AuthModule';
import {FileModule} from './file/infrastructure/FileModule';
import {InitModule} from './init/infrastructure/InitModule';
import {MetricsModule} from './metrics/infrastructure/MetricsModule';

const appModuleConfig: IModule = {
    ...baseConfig,
    config: () => {
        const config: IRestAppModuleConfig = baseConfig.config();

        return {
            ...config,
            name: 'practice-backend-steroids',
            title: 'practice-backend-steroids',
            cors: {
                ...config?.cors,
                allowHeaders: [
                    'Origin',
                    'X-Requested-With',
                    'Content-Type',
                    'Accept',
                    'Authorization',
                    'X-CSRF-Token',

                    // For file PUT upload
                    'If-None-Match',
                    'If-Modified-Since',
                    'Cache-Control',
                    'X-Requested-With',
                    'Content-Disposition',
                    'Content-Range',
                ],
                allowDomains: [
                ],
            },
            auth: {
                jwtAccessSecretKey: process.env.AUTH_JWT_ACCESS_SECRET_KEY || (process.env.AUTH_JWT_SECRET_KEY + 'a'),
                jwtRefreshSecretKey: process.env.AUTH_JWT_REFRESH_SECRET_KEY || (process.env.AUTH_JWT_SECRET_KEY + 'r'),
                accessTokenExpiresSec: '7h',
                refreshTokenExpiresSec: '30d',
            },
            database: {
                ...config.database,
                // Раскомментировать для отладки
                // logging: ['schema', 'warn', 'error', 'migration'/*, 'query'/**/],
            },
            sentry: {
                dsn: process.env.APP_SENTRY_DSN,
                environment: process.env.APP_ENVIRONMENT,
            },
        } as IRestAppModuleConfig;
    },
    module: (config: IRestAppModuleConfig) => {
        const module = baseConfig.module(config);
        return {
            ...module,
            imports: [
                // AuthModule,
                UserModule,
                // FileModule,
                // NotifierModule,
                // InitModule,
                process.env.APP_METRICS_TOKEN ? MetricsModule : null,
                ...module.imports,
            ].filter(Boolean),
        } as ModuleMetadata;
    },
};

Module(appModuleConfig)(null);

(new RestApplication()).start();
