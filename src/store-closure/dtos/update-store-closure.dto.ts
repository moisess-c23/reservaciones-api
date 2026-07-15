import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreClosureDto } from './create-store-closure.dto';

export class UpdateStoreClosureDto extends PartialType(CreateStoreClosureDto) {}