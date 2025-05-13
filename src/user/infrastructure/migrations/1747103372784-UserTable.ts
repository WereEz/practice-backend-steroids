import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class UserTable1747103372784 implements MigrationInterface {
    name = 'UserTable1747103372784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "username" character varying(32) NOT NULL,
                "firstName" character varying NOT NULL,
                "surname" character varying NOT NULL,
                "email" character varying NOT NULL,
                "passwordHash" character varying NOT NULL,
                "bio" character varying,
                "avatarId" integer,
                "createdAt" TIMESTAMP(0) NOT NULL,
                "updatedAt" TIMESTAMP(0),
                "deletedAt" date,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }
}
