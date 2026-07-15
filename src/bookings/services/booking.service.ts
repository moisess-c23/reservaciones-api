import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { BookingRepository } from '../repositories/booking.repository';
import { Booking } from '../entities/booking.entity';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { UpdateBookingDto } from '../dtos/update-booking.dto';
import { EmployeeScheduleService } from 'src/employee-schedule/services/employee-schedule.service';
import { StoreClosureService } from 'src/store-closure/services/store-closure.service';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { ServiceProvidedRepository } from 'src/services-provided/repositories/service-provided.repository';
import { StateReservationRepository } from 'src/states-reservations/repositories/state-reservation.repository';
import { UserRepository } from 'src/users/repositories/user.repository';
import { EmployeeManagementRepository } from 'src/employee-management/repositories/employee-management.repository';

@Injectable()
export class BookingService {
    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly employeeScheduleService: EmployeeScheduleService,
        private readonly storeClosureService: StoreClosureService,
        private readonly serviceProvidedRepo: ServiceProvidedRepository,
        private readonly stateReservationRepo: StateReservationRepository,
        private readonly userRepo: UserRepository,
        private readonly employeeManagementRepo: EmployeeManagementRepository,
    ) { }

    async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
        const { reservation_date, reservation_time, serviceId, employeeId, userId } = createBookingDto;

        const reservation_day = this.getDayOfWeek(reservation_date);
        console.log(`Día de la reserva (BookingService): ${reservation_day}`);

        const employee = await this.employeeManagementRepo.getEmployeeById(employeeId);
        if (!employee) {
            throw new NotFoundException(`El empleado con ID ${employeeId} no existe.`);
        }

        const employeeAvailability = await this.employeeScheduleService.getEmployeeAvailability(
            employeeId,
            reservation_date,
            reservation_time,
        );

        if (!employeeAvailability.isAvailable) {
            throw new BadRequestException(employeeAvailability.message);
        }

        const storeClosureStatus = await this.storeClosureService.checkIfStoreIsClosed(
            reservation_date,
            reservation_day,
            reservation_time,
        );
        console.log('Estado de la tienda:', storeClosureStatus);

        if (storeClosureStatus.isClosed) {
            throw new BadRequestException(storeClosureStatus.message);
        }

        const service = await this.serviceProvidedRepo.getServiceById(serviceId);
        if (!service) {
            throw new NotFoundException(`El servicio con ID ${serviceId} no existe.`);
        }

        const state = await this.stateReservationRepo.getStateReservationByName('pendiente');
        if (!state) {
            throw new NotFoundException(`No se encontró un estado que incluya "pendiente".`);
        }

        let user = null;
        if (userId) {
            user = await this.userRepo.getUserById(userId);
            if (!user) {
                throw new NotFoundException(`El usuario con ID ${userId} no existe.`);
            }
        }

        const bookingData: Partial<Booking> = {
            ...createBookingDto,
            reservation_day,
            service,
            state,
            user,
            employee,
        };

        const booking = await this.bookingRepository.createBooking(bookingData);

        if (user) {
            user.reservations += 1;
            await this.userRepo.updateUser(user.id, { reservations: user.reservations });
        }

        return booking;
    }

    async getBookings(): Promise<Booking[]> {
        return this.bookingRepository.getBookings();
    }

    async getBookingById(id: number): Promise<Booking> {
        const booking = await this.bookingRepository.getBookingById(id);
        if (!booking) {
            throw new NotFoundException(`La reserva con ID ${id} no existe.`);
        }
        return booking;
    }

    async updateBooking(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
        const booking = await this.getBookingById(id);

        const reservation_day = updateBookingDto.reservation_date
            ? this.getDayOfWeek(updateBookingDto.reservation_date)
            : booking.reservation_day;

        const updatedData = {
            ...booking,
            ...updateBookingDto,
            reservation_day,
            updated_at: new Date(),
        };

        return this.bookingRepository.updateBooking(id, updatedData);
    }

    async deleteBooking(id: number): Promise<void> {
        await this.getBookingById(id);
        await this.bookingRepository.deleteBooking(id);
    }

    private getDayOfWeek(reservation_date: string): string {
        const date = parseISO(reservation_date);
        console.log(date, 'BookingService');
        console.log(format(date, 'EEEE', { locale: es }), 'BookingService');
        return format(date, 'EEEE', { locale: es }).toLowerCase();
    }
}