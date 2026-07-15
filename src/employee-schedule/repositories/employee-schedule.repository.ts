import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeSchedule } from '../entities/employee-schedule.entity';

@Injectable()
export class EmployeeScheduleRepository {
    constructor(
        @InjectRepository(EmployeeSchedule)
        private readonly scheduleRepo: Repository<EmployeeSchedule>,
    ) { }

    async createSchedule(data: Partial<EmployeeSchedule>): Promise<EmployeeSchedule> {
        return this.scheduleRepo.save(data);
    }

    async getSchedules(): Promise<EmployeeSchedule[]> {
        return this.scheduleRepo.find({ relations: ['employee'] });
    }

    async getScheduleById(employeeId: number): Promise<EmployeeSchedule[]> {
        return this.scheduleRepo.find({ where: { employee: { id: employeeId } }, relations: ['employee'] });
    }

    async updateSchedule(id: number, data: Partial<EmployeeSchedule>): Promise<EmployeeSchedule> {
        await this.scheduleRepo.update(id, data);
        return this.scheduleRepo.findOne({ where: { id }, relations: ['employee'] });
    }

    async deleteSchedule(id: number): Promise<void> {
        await this.scheduleRepo.delete(id);
    }
}