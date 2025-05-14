import {ContextDto as BaseContextDto} from '@steroidsjs/nest/usecases/dtos/ContextDto';

export class ContextDto extends BaseContextDto {
    userId: number;
}
