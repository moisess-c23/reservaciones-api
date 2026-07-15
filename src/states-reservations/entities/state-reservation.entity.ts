import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('states_reservations')
export class StateReservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_state: string;

    @Column()
    description: string;

    @Column()
    color_hex: string;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => Booking, booking => booking.state)
    bookings: Booking[];
}