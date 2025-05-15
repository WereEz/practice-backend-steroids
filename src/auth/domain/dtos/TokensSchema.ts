import { StringField } from '@steroidsjs/nest/infrastructure/decorators/fields';

export class TokensSchema {
  @StringField({
    label: 'Токен доступа',
  })
  accessToken: string;
  @StringField({
    label: 'Токен обновления',
  })
  refreshToken: string;
}
