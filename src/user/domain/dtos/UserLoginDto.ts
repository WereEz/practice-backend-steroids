import {PasswordField, StringField} from '@steroidsjs/nest/infrastructure/decorators/fields';

export class UserLoginDto {
    @StringField({
        label: 'Емаил',
        required: true,
    })
    login: string;

    @PasswordField({
        label: 'Пароль',
        required: true,
    })
    password: string;
}
