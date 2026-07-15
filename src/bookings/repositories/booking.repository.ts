import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../entities/booking.entity';

@Injectable()
export class BookingRepository {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepo: Repository<Booking>,
    ) { }

    async createBooking(data: Partial<Booking>): Promise<Booking> {
        return this.bookingRepo.save(data);
    }

    async getBookings(): Promise<Booking[]> {
        return this.bookingRepo.find({ relations: ['service', 'employee', 'state'] });
    }

    async getBookingById(id: number): Promise<Booking | null> {
        return this.bookingRepo.findOne({ where: { id }, relations: ['service', 'employee', 'state'] });
    }

    async updateBooking(id: number, data: Partial<Booking>): Promise<Booking> {
        await this.bookingRepo.update(id, data);
        return this.getBookingById(id);
    }

    async deleteBooking(id: number): Promise<void> {
        await this.bookingRepo.delete(id);
    }
}