import {ApiProperty} from '@nestjs/swagger';
import {UserSchema} from '@steroidsjs/nest/infrastructure/tests/app/schemas/UserSchema';

export class AuthInitSchema {
    @ApiProperty()
    readonly user: UserSchema;
}
