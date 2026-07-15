import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateStateReservationDto {
    @IsString()
    @IsNotEmpty()
    name_state: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    color_hex: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}