import { ExtendField, StringField } from '@steroidsjs/nest/infrastructure/decorators/fields';
import { UserModel } from '../models/UserModel';

export class UserSchema {
    @ExtendField(UserModel)
    id: number;

    @ExtendField(UserModel)
    username: string;

    @ExtendField(UserModel)
    firstName: string;

    @ExtendField(UserModel)
    surname: string;

    @ExtendField(UserModel)
    email: string;


    @ExtendField(UserModel)
    bio?: string;

    @ExtendField(UserModel)
    avatarId?: number;
}