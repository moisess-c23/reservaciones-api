import { IsOptional, IsString, IsBoolean, IsDateString, Matches } from 'class-validator';

export class CreateStoreClosureDto {
    @IsOptional()
    @IsString()
    day?: string;

    @IsOptional()
    @IsDateString()
    date?: string;

    @IsBoolean()
    @IsOptional()
    all_day?: boolean;

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
}