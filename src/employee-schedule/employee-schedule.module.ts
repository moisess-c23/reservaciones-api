import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSchedule } from './entities/employee-schedule.entity';
import { EmployeeScheduleController } from './controllers/employee-schedule.controller';
import { EmployeeScheduleService } from './services/employee-schedule.service';
import { EmployeeScheduleRepository } from './repositories/employee-schedule.repository';
import { EmployeeManagementModule } from '../employee-management/employee-management.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeSchedule]), EmployeeManagementModule],
  controllers: [EmployeeScheduleController],
  providers: [EmployeeScheduleService, EmployeeScheduleRepository],
  exports: [EmployeeScheduleService, TypeOrmModule, EmployeeScheduleRepository],
})
export class EmployeeScheduleModule { }