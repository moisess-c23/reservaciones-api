import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(private readonly UserRepository: UserRepository) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.UserRepository.createUser({ ...createUserDto, password: hashedPassword });
    }

    async getUsers(): Promise<User[]> {
        return this.UserRepository.getUsers();
    }

    async getUserById(id: number): Promise<User> {
        const user = this.UserRepository.getUserById(id);
        if (!user) {
            throw new NotFoundException(`El usuario con Id ${id} no existe`);
        }
        return user;
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        return this.UserRepository.updateUser(id, updateUserDto);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.getUserById(id);
        if (!user) {
            throw new NotFoundException(`El usuario con Id ${id} no existe`);
        }
        await this.UserRepository.deleteUser(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.UserRepository.getUserByEmail(email);
        if (!user) {
            throw new NotFoundException(`No se encontró un usuario con el email: ${email}`);
        }
        return user;
    }
}