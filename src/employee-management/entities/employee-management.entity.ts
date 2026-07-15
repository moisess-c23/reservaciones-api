import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EmployeeSchedule } from '../../employee-schedule/entities/employee-schedule.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('employee_management')
export class EmployeeManagement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.employee, { nullable: false })
  user: User; 

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => EmployeeSchedule, (schedule) => schedule.employee)
  schedules: EmployeeSchedule[];

  @OneToMany(() => Booking, (booking) => booking.employee)
  bookings: Booking[];
}