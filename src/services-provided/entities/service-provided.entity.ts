import { Booking } from '../../bookings/entities/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('services')
export class ServiceProvided {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  duration: number;

  @OneToMany(() => Booking, booking => booking.service)
  bookings: Booking[];
}