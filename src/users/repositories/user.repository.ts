import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }

    async createUser(data: Partial<User>): Promise<User> {
        return this.userRepo.save(data);
    }

    async getUsers(): Promise<User[]> {
        return this.userRepo.find();
    }

    async getUserById(id: number): Promise<User | null> {
        return this.userRepo.findOne({ where: { id } });
    }

    async updateUser(id: number, data: Partial<User>): Promise<User> {
        await this.userRepo.update(id, data);
        return this.getUserById(id);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepo.delete(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({ where: { email } });
    }
}