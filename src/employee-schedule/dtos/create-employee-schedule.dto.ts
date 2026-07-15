import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsInt, Matches } from 'class-validator';

export class CreateEmployeeScheduleDto {
    @IsInt()
    @IsNotEmpty()
    employeeId: number;

    @IsString()
    @IsNotEmpty()
    day: string;

    @IsOptional()
    @IsString()
    @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
        message: 'start_time must be in HH:mm format',
    })
    start_time?: string;

    @IsOptional()
    @IsString()
    @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
        message: 'end_time must be in HH:mm format',
    })
    end_time?: string;

    @IsBoolean()
    @IsOptional()
    is_day_off: boolean;
}