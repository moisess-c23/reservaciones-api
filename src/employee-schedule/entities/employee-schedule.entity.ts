import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EmployeeManagement } from '../../employee-management/entities/employee-management.entity';

@Entity('employee_schedule')
export class EmployeeSchedule {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => EmployeeManagement, (employee) => employee.schedules, { onDelete: 'CASCADE' })
    employee: EmployeeManagement;

    @Column()
    day: string;

    @Column({ type: 'time', nullable: true })
    start_time: string;

    @Column({ type: 'time', nullable: true })
    end_time: string;

    @Column({ nullable: true })
    date_off: string;

    @Column({ default: false })
    is_day_off: boolean;

    @Column({ default: true })
    active: boolean;
}