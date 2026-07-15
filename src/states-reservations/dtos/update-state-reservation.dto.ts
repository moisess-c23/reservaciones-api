import { PartialType } from '@nestjs/mapped-types';
import { CreateStateReservationDto } from './create-state-reservation.dto';

export class UpdateStateReservationDto extends PartialType(CreateStateReservationDto) { }