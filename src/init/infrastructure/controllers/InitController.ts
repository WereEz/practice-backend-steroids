import {Body, Controller, Inject, Post} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {ContextDto} from '@steroidsjs/nest/usecases/dtos/ContextDto';
import {Context} from '@steroidsjs/nest/infrastructure/decorators/Context';
import {IUserService} from '@steroidsjs/nest-modules/user/services/IUserService';
import {AuthInitSchema} from '../schemas/AuthInitSchema';
import getExportedEnums from '../helpers/getExportedEnums';
import {InitRequestDto} from '../../usecases/dtos/InitRequestDto';
import {exportEnums} from '../helpers/entitiesExporter';

@ApiTags('Авторизация')
@Controller('/init')
export class InitController {
    constructor(
        @Inject(IUserService)
        private userService: IUserService,
    ) {}

    @Post()
    @ApiOkResponse({type: AuthInitSchema})
    async init(
        @Context() context: ContextDto,
        @Body() dto: InitRequestDto,
    ) {
        const user = context.user?.id ? await this.userService.findById(context.user.id) : null;

        const exportedEnums = exportEnums(getExportedEnums());

        return {
            user,
            meta: {
                ...exportedEnums,
            },
        };
    }
}
