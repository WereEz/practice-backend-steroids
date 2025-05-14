import { StringField } from '@steroidsjs/nest/infrastructure/decorators/fields/StringField';
import { SearchInputDto } from '@steroidsjs/nest/usecases/dtos/SearchInputDto';

export class UserSearchDto extends SearchInputDto {
    @StringField()
    query: string;
}
