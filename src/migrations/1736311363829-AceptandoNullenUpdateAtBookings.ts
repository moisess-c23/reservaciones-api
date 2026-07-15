import { MigrationInterface, QueryRunner } from "typeorm";

export class AceptandoNullenUpdateAtBookings1736311363829 implements MigrationInterface {
    name = 'AceptandoNullenUpdateAtBookings1736311363829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookings\` CHANGE \`reservation_day\` \`reservation_day\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`bookings\` CHANGE \`updated_at\` \`updated_at\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookings\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`bookings\` CHANGE \`reservation_day\` \`reservation_day\` varchar(20) NOT NULL`);
    }

}