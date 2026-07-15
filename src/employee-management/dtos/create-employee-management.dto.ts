import { IsNotEmpty, IsEmail, IsString, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateEmployeeManagementDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone_number: string;

    @IsOptional()
    @IsString()
    active?: boolean;
}