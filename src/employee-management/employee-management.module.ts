import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeManagement } from './entities/employee-management.entity';
import { EmployeeManagementController } from './controllers/employee-management.controller';
import { EmployeeManagementService } from './services/employee-management.service';
import { EmployeeManagementRepository } from './repositories/employee-management.repository';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeManagement]), UserModule],
  controllers: [EmployeeManagementController],
  providers: [EmployeeManagementService, EmployeeManagementRepository],
  exports: [EmployeeManagementService, TypeOrmModule, EmployeeManagementRepository]
})
export class EmployeeManagementModule { }