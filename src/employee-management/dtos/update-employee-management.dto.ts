import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeManagementDto } from './create-employee-management.dto';

export class UpdateEmployeeManagementDto extends PartialType(CreateEmployeeManagementDto) {}