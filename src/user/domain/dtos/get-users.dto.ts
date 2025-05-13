import { IntegerField, StringField } from '@steroidsjs/nest/infrastructure/decorators/fields';
export class GetUsersDto {

  @StringField({
    label: 'Фильтрация по никнейму или имени и фамилии',
  })
  query?: string;

  @IntegerField({
    label: 'Номер страницы',
    min: 1,
  })
  page?: number;

  @IntegerField({
    label: 'Размер страницы',
    min: 1,
  })
  limit?: number;
}
