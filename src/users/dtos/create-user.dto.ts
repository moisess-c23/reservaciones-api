import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsBoolean()
    @IsOptional()
    active?: boolean;

}