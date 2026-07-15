import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregandoCampoReservationsUsers1736568849690 implements MigrationInterface {
    name = 'AgregandoCampoReservationsUsers1736568849690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`reservations\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`reservations\``);
    }

}