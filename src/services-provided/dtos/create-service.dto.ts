import { IsNotEmpty, IsString, IsDecimal, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateServiceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDecimal()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsOptional()
    duration?: number;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}