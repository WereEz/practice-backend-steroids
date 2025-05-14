import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {DataMapper} from '@steroidsjs/nest/usecases/helpers/DataMapper';
import {ContextDto} from '../../domain/dtos/ContextDto';

export const Context = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        return DataMapper.create<ContextDto>(ContextDto, {
            user: request.user,
        });
    },
);