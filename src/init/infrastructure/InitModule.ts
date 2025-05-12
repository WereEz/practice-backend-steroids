import {Module} from '@nestjs/common';
import {InitController} from './controllers/InitController';
import {UserModule} from '../../user/infrastructure/UserModule';
import {HealthController} from './controllers/HealthController';

@Module({
    imports: [
        UserModule,
    ],
    controllers: [
        InitController,
        HealthController,
    ],
})
export class InitModule {}
