import { IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    name_user: string;

    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @IsDateString()
    @IsNotEmpty()
    reservation_date: string;

    @IsString()
    @IsNotEmpty()
    reservation_time: string;

    @IsInt()
    @IsNotEmpty()
    serviceId: number;

    @IsInt()
    @IsNotEmpty()
    employeeId: number;

    @IsInt()
    userId?: number;
}