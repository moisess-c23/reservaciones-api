import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregandoDateOffEmployeeSchedule1736650212905 implements MigrationInterface {
    name = 'AgregandoDateOffEmployeeSchedule1736650212905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee_schedule\` ADD \`date_off\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`store_closure\` ADD \`recurring_day\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_closure\` DROP COLUMN \`recurring_day\``);
        await queryRunner.query(`ALTER TABLE \`employee_schedule\` DROP COLUMN \`date_off\``);
    }

}