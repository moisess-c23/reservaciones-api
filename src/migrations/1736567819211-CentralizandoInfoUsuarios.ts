import { MigrationInterface, QueryRunner } from "typeorm";

export class CentralizandoInfoUsuarios1736567819211 implements MigrationInterface {
    name = 'CentralizandoInfoUsuarios1736567819211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0eb55151a6ac4b4c61102464bd\` ON \`employee_management\``);
        await queryRunner.query(`ALTER TABLE \`employee_management\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`employee_management\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`employee_management\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`employee_management\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`reservations\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`employee_management\` ADD \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('admin', 'boss', 'cliente', 'employee') NOT NULL DEFAULT 'cliente'`);
        await queryRunner.query(`ALTER TABLE \`employee_management\` ADD CONSTRAINT \`FK_764905634d49bb5776ba7292d3d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee_management\` DROP FOREIGN KEY \`FK_764905634d49bb5776ba7292d3d\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('admin', 'boss', 'cliente') NOT NULL DEFAULT 'cliente'`);
        await queryRunner.query(`ALTER TABLE \`employee_management\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`reservations\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`employee_management\` ADD \`phone_number\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`employee_management\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`employee_management\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`employee_management\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0eb55151a6ac4b4c61102464bd\` ON \`employee_management\` (\`email\`)`);
    }

}