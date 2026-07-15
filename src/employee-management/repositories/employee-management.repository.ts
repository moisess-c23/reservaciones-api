import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeManagement } from '../entities/employee-management.entity';

@Injectable()
export class EmployeeManagementRepository {
    constructor(
        @InjectRepository(EmployeeManagement)
        private readonly employeeRepo: Repository<EmployeeManagement>,
    ) { }

    async createEmployee(data: Partial<EmployeeManagement>): Promise<EmployeeManagement> {
        return this.employeeRepo.save(data);
    }

    async getEmployees(): Promise<EmployeeManagement[]> {
        return this.employeeRepo.find({ relations: ['user', 'schedules'] });
    }

    async getEmployeeById(id: number): Promise<EmployeeManagement | null> {
        return this.employeeRepo.findOne({ where: { id }, relations: ['user', 'schedules'] });
    }

    async updateEmployee(id: number, data: Partial<EmployeeManagement>): Promise<EmployeeManagement> {
        await this.employeeRepo.update(id, data);
        return this.getEmployeeById(id);
    }

    async deleteEmployee(id: number): Promise<void> {
        await this.employeeRepo.delete(id);
    }
}