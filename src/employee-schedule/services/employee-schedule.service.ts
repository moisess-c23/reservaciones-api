import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeScheduleRepository } from '../repositories/employee-schedule.repository';
import { EmployeeManagementRepository } from '../../employee-management/repositories/employee-management.repository';
import { CreateEmployeeScheduleDto } from '../dtos/create-employee-schedule.dto';
import { UpdateEmployeeScheduleDto } from '../dtos/update-employee-schedule.dto';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

@Injectable()
export class EmployeeScheduleService {
  constructor(
    private readonly scheduleRepo: EmployeeScheduleRepository,
    private readonly employeeRepo: EmployeeManagementRepository,
  ) { }

  async createSchedule(dto: CreateEmployeeScheduleDto) {
    const employee = await this.employeeRepo.getEmployeeById(dto.employeeId);
    if (!employee) {
      throw new NotFoundException(`El empleado con ID ${dto.employeeId} no existe`);
    }

    return this.scheduleRepo.createSchedule({
      ...dto,
      employee,
    });
  }

  async getSchedules() {
    return this.scheduleRepo.getSchedules();
  }

  async getScheduleById(employeeId: number) {
    const schedules = await this.scheduleRepo.getScheduleById(employeeId);
    if (!schedules.length)
      throw new NotFoundException(`No existen horarios para el empleado con ID ${employeeId}`);
    return schedules;
  }

  async updateSchedule(id: number, dto: UpdateEmployeeScheduleDto) {
    const schedule = await this.scheduleRepo.updateSchedule(id, dto);
    if (!schedule) throw new NotFoundException(`El horario con ID ${id} no existe`);
    return schedule;
  }

  async deleteSchedule(id: number) {
    await this.scheduleRepo.deleteSchedule(id);
  }

  async getEmployeeAvailability(employeeId: number, reservationDate: string, reservationTime: string) {
    const schedules = await this.getScheduleById(employeeId);
    const reservationDay = this.getDayOfWeek(reservationDate);

    for (const schedule of schedules) {
      if (schedule.day.toLowerCase() === reservationDay.toLowerCase()) {
        if (schedule.is_day_off) {
          return {
            isAvailable: false,
            message: `El empleado tiene el día libre (${schedule.day}).`,
          };
        }

        if (!schedule.start_time || !schedule.end_time) {
          return {
            isAvailable: false,
            message: `El empleado no tiene un horario definido para el día ${schedule.day}.`,
          };
        }

        if (reservationTime < schedule.start_time || reservationTime > schedule.end_time) {
          return {
            isAvailable: false,
            message: `El empleado solo está disponible de ${schedule.start_time} a ${schedule.end_time} el ${schedule.day}.`,
          };
        }
      }
    }

    return { isAvailable: true, message: 'El empleado está disponible.' };
  }

  private getDayOfWeek(reservation_date: string): string {
    const date = parseISO(reservation_date);
    console.log(date, 'employee-schedule.service.ts');
    console.log(format(date, 'EEEE', { locale: es }), 'employee-schedule.service.ts');
    return format(date, 'EEEE', { locale: es }).toLowerCase();
  }
}