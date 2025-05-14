import { StringField } from '@steroidsjs/nest/infrastructure/decorators/fields';

export class TokensDto {
  @StringField({
    label: 'Токен доступа',
  })
  accessToken: string;
  @StringField({
    label: 'Токен обновления',
  })
  refreshToken: string;
}
