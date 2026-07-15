import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeManagementRepository } from '../repositories/employee-management.repository';
import { CreateEmployeeManagementDto } from '../dtos/create-employee-management.dto';
import { UpdateEmployeeManagementDto } from '../dtos/update-employee-management.dto';
import { EmployeeManagement } from '../entities/employee-management.entity';
import { UserService } from 'src/users/services/user.service';
import { UserRole } from 'src/users/entities/user.entity';



@Injectable()
export class EmployeeManagementService {
  constructor(private readonly employeeRepo: EmployeeManagementRepository,
    private readonly userService: UserService) { }

  async createEmployee(createEmployeeDto: CreateEmployeeManagementDto): Promise<EmployeeManagement> {
    const user = await this.userService.createUser({
      name: createEmployeeDto.name,
      email: createEmployeeDto.email,
      phone_number: createEmployeeDto.phone_number,
      password: createEmployeeDto.password,
      role: UserRole.EMPLOYEE,
    });

    const employee = this.employeeRepo.createEmployee({
      user,
      active: true,
    });

    return employee;
  }

  async getEmployees() {
    return this.employeeRepo.getEmployees();
  }

  async getEmployeeById(id: number) {
    const employee = await this.employeeRepo.getEmployeeById(id);
    if (!employee) throw new NotFoundException(`El empleado con ID ${id} no existe`);
    return employee;
  }

  async updateEmployee(id: number, dto: UpdateEmployeeManagementDto) {
    return this.employeeRepo.updateEmployee(id, dto);
  }

  async deleteEmployee(id: number) {
    await this.getEmployeeById(id);
    return this.employeeRepo.deleteEmployee(id);
  }
}