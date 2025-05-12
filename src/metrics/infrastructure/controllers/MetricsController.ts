import {Controller, Get, Res, UseGuards} from '@nestjs/common';
import {PrometheusController} from '@willsoto/nestjs-prometheus';
import {Response} from 'express';
import {ApiTags} from '@nestjs/swagger';
import {AccessGuard} from '../guards/AccessGuard';

@ApiTags('Метрики приложения')
@Controller()
@UseGuards(AccessGuard)
export class MetricsController extends PrometheusController {
    @Get()
    async index(@Res({passthrough: true}) response: Response) {
        return super.index(response);
    }
}
