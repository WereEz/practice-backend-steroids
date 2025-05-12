import {Module} from '@nestjs/common';
import {PrometheusModule} from '@willsoto/nestjs-prometheus';
import {MetricsController} from './controllers/MetricsController';

@Module({
    imports: [
        PrometheusModule.register({
            controller: MetricsController,
        }),
    ],
})
export class MetricsModule {}
