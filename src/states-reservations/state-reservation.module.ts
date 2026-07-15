import { Module } from '@nestjs/common';
import { StateReservationService } from './services/state-reservation.service';
import { StateReservationController } from './controllers/state-reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateReservation } from './entities/state-reservation.entity';
import { StateReservationRepository } from './repositories/state-reservation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StateReservation])],
  providers: [StateReservationService, StateReservationRepository],
  controllers: [StateReservationController],
  exports: [TypeOrmModule, StateReservationService, StateReservationRepository]
})
export class StateReservationModule { }