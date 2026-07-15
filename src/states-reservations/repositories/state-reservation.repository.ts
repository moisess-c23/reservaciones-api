import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StateReservation } from '../entities/state-reservation.entity';

@Injectable()
export class StateReservationRepository {
    constructor(
        @InjectRepository(StateReservation)
        private readonly stateReservationRepo: Repository<StateReservation>) { }

    async createStateReservation(data: Partial<StateReservation>): Promise<StateReservation> {
        return this.stateReservationRepo.save(data);
    }

    async getStateReservations(): Promise<StateReservation[]> {
        return this.stateReservationRepo.find();
    }

    async getStateReservationById(id: number): Promise<StateReservation | null> {
        return this.stateReservationRepo.findOne({ where: { id } });
    }

    async updateStateReservation(id: number, data: Partial<StateReservation>,): Promise<StateReservation> {
        await this.stateReservationRepo.update(id, data);
        return this.getStateReservationById(id);
    }

    async deleteStateReservation(id: number): Promise<void> {
        await this.stateReservationRepo.delete(id);
    }

    async getStateReservationByName(keyword: string): Promise<StateReservation | null> {
        return this.stateReservationRepo.findOne({
            where: {
                name_state: Like(`%${keyword}%`),
                active: true,
            },
        });
    }
}