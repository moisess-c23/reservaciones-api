import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { EmployeeScheduleService } from '../services/employee-schedule.service';
import { CreateEmployeeScheduleDto } from '../dtos/create-employee-schedule.dto';
import { UpdateEmployeeScheduleDto } from '../dtos/update-employee-schedule.dto';

@Controller('employees-schedules')
export class EmployeeScheduleController {
  constructor(private readonly scheduleService: EmployeeScheduleService) { }

  @Post()
  async create(@Body() dto: CreateEmployeeScheduleDto) {
    return this.scheduleService.createSchedule(dto);
  }

  @Get()
  async getSchedules() {
    return this.scheduleService.getSchedules();
  }

  @Get(':employeeId')
  async findByEmployee(@Param('employeeId') employeeId: number) {
    return this.scheduleService.getScheduleById(employeeId);
  }

  @Patch(':id')
  async updateSchedule(@Param('id') id: number, @Body() dto: UpdateEmployeeScheduleDto) {
    return this.scheduleService.updateSchedule(id, dto);
  }

  @Delete(':id')
  async deleteSchedule(@Param('id') id: number) {
    return this.scheduleService.deleteSchedule(id);
  }
}