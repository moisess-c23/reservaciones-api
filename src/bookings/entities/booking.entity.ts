import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ServiceProvided } from '../../services-provided/entities/service-provided.entity';
import { StateReservation } from '../../states-reservations/entities/state-reservation.entity';
import { EmployeeManagement } from '../../employee-management/entities/employee-management.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings, { nullable: true })
  user: User;

  @ManyToOne(() => ServiceProvided, (service) => service.bookings)
  service: ServiceProvided;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name_user: string;

  @Column({ type: 'varchar', length: 15 })
  phone_number: string;

  @Column({ type: 'date', nullable: false })
  reservation_date: string;

  @Column({ type: 'time', nullable: false })
  reservation_time: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  reservation_day: string;

  @ManyToOne(() => StateReservation, (state) => state.bookings)
  state: StateReservation;

  @ManyToOne(() => EmployeeManagement, (employee) => employee.bookings)
  employee: EmployeeManagement;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}