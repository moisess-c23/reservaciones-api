import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';
import { EmployeeManagement } from '../../employee-management/entities/employee-management.entity';

export enum UserRole {
  ADMIN = 'admin',
  BOSS = 'boss',
  CLIENTE = 'cliente',
  EMPLOYEE = 'employee',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone_number: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENTE,
  })
  role: UserRole;

  @Column({ default: true })
  active: boolean;

  @Column({ default: 0 })
  reservations: number;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => EmployeeManagement, (employee) => employee.user)
  employee: EmployeeManagement[];
}