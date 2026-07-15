import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { EmployeeManagementService } from '../services/employee-management.service';
import { CreateEmployeeManagementDto } from '../dtos/create-employee-management.dto';
import { UpdateEmployeeManagementDto } from '../dtos/update-employee-management.dto';

@Controller('employees-management')
export class EmployeeManagementController {
  constructor(private readonly employeeService: EmployeeManagementService) { }

  @Post()
  async create(@Body() dto: CreateEmployeeManagementDto) {
    return this.employeeService.createEmployee(dto);
  }

  @Get()
  async getEmployees() {
    return this.employeeService.getEmployees();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: number) {
    return this.employeeService.getEmployeeById(id);
  }

  @Patch(':id')
  async updateEmployee(@Param('id') id: number, @Body() dto: UpdateEmployeeManagementDto) {
    return this.employeeService.updateEmployee(id, dto);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number) {
    return this.employeeService.deleteEmployee(id);
  }
}