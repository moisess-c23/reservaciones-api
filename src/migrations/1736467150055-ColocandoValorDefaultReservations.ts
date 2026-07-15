import { MigrationInterface, QueryRunner } from "typeorm";

export class ColocandoValorDefaultReservations1736467150055 implements MigrationInterface {
    name = 'ColocandoValorDefaultReservations1736467150055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`reservations\` \`reservations\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` enum ('admin', 'boss', 'cliente') NOT NULL DEFAULT 'cliente'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`active\` \`active\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`active\` \`active\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`reservations\` \`reservations\` int NOT NULL`);
    }

}