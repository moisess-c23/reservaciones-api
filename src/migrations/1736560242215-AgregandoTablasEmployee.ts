import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregandoTablasEmployee1736560242215 implements MigrationInterface {
    name = 'AgregandoTablasEmployee1736560242215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookings\` CHANGE \`updated_at\` \`employeeId\` timestamp NULL`);
        await queryRunner.query(`CREATE TABLE \`employee_schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`day\` varchar(255) NOT NULL, \`start_time\` time NULL, \`end_time\` time NULL, \`is_day_off\` tinyint NOT NULL DEFAULT 0, \`active\` tinyint NOT NULL DEFAULT 1, \`employeeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee_management\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_0eb55151a6ac4b4c61102464bd\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`store_closure\` (\`id\` int NOT NULL AUTO_INCREMENT, \`day\` varchar(255) NULL, \`date\` date NULL, \`all_day\` tinyint NOT NULL DEFAULT 0, \`active\` tinyint NOT NULL DEFAULT 1, \`start_time\` time NULL, \`end_time\` time NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`services\` ADD \`duration\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`states_reservations\` CHANGE \`active\` \`active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`employeeId\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`employeeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`employee_schedule\` ADD CONSTRAINT \`FK_00fda0dea152ca01567aa51a151\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee_management\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_5415b42a6b8fd5e640e1b81f89a\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee_management\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_5415b42a6b8fd5e640e1b81f89a\``);
        await queryRunner.query(`ALTER TABLE \`employee_schedule\` DROP FOREIGN KEY \`FK_00fda0dea152ca01567aa51a151\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`employeeId\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`employeeId\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`states_reservations\` CHANGE \`active\` \`active\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`services\` DROP COLUMN \`duration\``);
        await queryRunner.query(`DROP TABLE \`store_closure\``);
        await queryRunner.query(`DROP INDEX \`IDX_0eb55151a6ac4b4c61102464bd\` ON \`employee_management\``);
        await queryRunner.query(`DROP TABLE \`employee_management\``);
        await queryRunner.query(`DROP TABLE \`employee_schedule\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` CHANGE \`employeeId\` \`updated_at\` timestamp NULL`);
    }

}