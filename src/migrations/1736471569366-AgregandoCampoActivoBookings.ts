import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregandoCampoActivoBookings1736471569366 implements MigrationInterface {
    name = 'AgregandoCampoActivoBookings1736471569366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`active\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`active\``);
    }

}