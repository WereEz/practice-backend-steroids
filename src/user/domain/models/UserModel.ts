import {
    PrimaryKeyField, StringField, EmailField, ComputableField,
    CreateTimeField, IntegerField, UpdateTimeField, DeleteDateField
} from '@steroidsjs/nest/infrastructure/decorators/fields';

export class UserModel {
    @PrimaryKeyField()
    id: number;

    @StringField({
        label: 'Никнейм',
        unique: true,
        max: 32,
    })
    username: string;

    @StringField({
        label: 'Имя',
    })
    firstName: string;

    @StringField({
        label: 'Фамилия',
    })
    surname: string;

    @EmailField({
        label: 'Почта',
        unique: true,
    })
    email: string;

    @StringField({
        label: 'Хэш пароля',
    })
    passwordHash: string;

    @StringField({
        label: 'Описание пользователя',
        nullable: true,
    })
    bio: string;

    @IntegerField({
        label: 'Id аватарки',
        nullable: true
    })
    avatarId: number;

    @CreateTimeField({
        label: 'Создан',
    })
    createdAt: Date;

    @UpdateTimeField({
        label: 'Обновлен',
        nullable: true,
    })
    updatedAt: Date;

    @DeleteDateField({
        label: 'Удален',
    })
    deletedAt: Date;

    @ComputableField({
        label: 'Полное имя',
        noColumn: true,
        callback: (item) => {
            const { firstName, surname } = item.item;
            return [firstName, surname].join(' ');
        },
    })
    fullName: string;

    //   followings: UserFollowerEntity[];

    //   @OneToMany(() => UserFollowerEntity, (uf) => uf.following)
    //   followers: UserFollowerEntity[];

    //   @OneToMany(() => PostLikeEntity, (like) => like.user)
    //   likes: PostLikeEntity[];

    //   @OneToMany(() => PostCommentEntity, (comment) => comment.user)
    //   comments: PostCommentEntity[];
}
