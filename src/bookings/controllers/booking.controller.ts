import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { UpdateBookingDto } from '../dtos/update-booking.dto';
import { Booking } from '../entities/booking.entity';

@Controller('bookings')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post()
    async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
        return this.bookingService.createBooking(createBookingDto);
    }

    @Get()
    async getBookings(): Promise<Booking[]> {
        return this.bookingService.getBookings();
    }

    @Get(':id')
    async getBookingById(@Param('id') id: number): Promise<Booking> {
        return this.bookingService.getBookingById(id);
    }

    @Patch(':id')
    async updateBooking(@Param('id') id: number, @Body() updateBookingDto: UpdateBookingDto,): Promise<Booking> {
        return this.bookingService.updateBooking(id, updateBookingDto);
    }

    @Delete(':id')
    async deleteBooking(@Param('id') id: number): Promise<void> {
        return this.bookingService.deleteBooking(id);
    }
}