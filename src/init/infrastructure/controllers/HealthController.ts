import {Controller, Get, HttpStatus} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Healthchecks')
@Controller('/health')
export class HealthController {
    @Get()
    @ApiOkResponse({status: HttpStatus.OK})
    async init() {
        return {};
    }
}
