import { Module } from '@nestjs/common';
import { BookingService } from './services/booking.service';
import { BookingController } from './controllers/booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingRepository } from './repositories/booking.repository';
import { ServicesProvidedModule } from 'src/services-provided/service-provided.module';
import { StateReservationModule } from 'src/states-reservations/state-reservation.module';
import { UserModule } from 'src/users/user.module';
import { EmployeeScheduleModule } from 'src/employee-schedule/employee-schedule.module';
import { StoreClosureModule } from 'src/store-closure/store-closure.module';
import { EmployeeManagementModule } from 'src/employee-management/employee-management.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), ServicesProvidedModule, StateReservationModule, UserModule, EmployeeScheduleModule, StoreClosureModule, EmployeeManagementModule],
  providers: [BookingService, BookingRepository],
  controllers: [BookingController],
  exports: [BookingService, TypeOrmModule, BookingRepository]
})
export class BookingsModule { }