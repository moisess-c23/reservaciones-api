import { Injectable, NotFoundException } from '@nestjs/common';
import { StateReservationRepository } from '../repositories/state-reservation.repository';
import { StateReservation } from '../entities/state-reservation.entity';
import { CreateStateReservationDto } from '../dtos/create-state-reservation.dto';
import { UpdateStateReservationDto } from '../dtos/update-state-reservation.dto';

@Injectable()
export class StateReservationService {
    constructor(private readonly stateReservationRepository: StateReservationRepository) { }

    async createStateReservation(createStateReservationDto: CreateStateReservationDto,): Promise<StateReservation> {
        return this.stateReservationRepository.createStateReservation(createStateReservationDto);
    }

    async getStateReservations(): Promise<StateReservation[]> {
        return this.stateReservationRepository.getStateReservations();
    }

    async getStateReservationById(id: number): Promise<StateReservation> {
        const state = await this.stateReservationRepository.getStateReservationById(id);
        if (!state) {
            throw new NotFoundException(`El estado de la reservacion con Id ${id} no existe`);
        }
        return state;
    }

    async updateStateReservation(id: number, updateStateReservationDto: UpdateStateReservationDto,): Promise<StateReservation> {
        return this.stateReservationRepository.updateStateReservation(id, updateStateReservationDto);
    }

    async deleteStateReservation(id: number): Promise<void> {
        const state = await this.getStateReservationById(id); 
        if (!state) {
            throw new NotFoundException(`El estado de la reservacion con Id ${id} no existe`);
        }
        await this.stateReservationRepository.deleteStateReservation(id);
    }
}