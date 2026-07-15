import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { StateReservationService } from '../services/state-reservation.service';
import { StateReservation } from '../entities/state-reservation.entity';
import { CreateStateReservationDto } from '../dtos/create-state-reservation.dto';
import { UpdateStateReservationDto } from '../dtos/update-state-reservation.dto';

@Controller('states-reservations')
export class StateReservationController {
    constructor(private readonly stateReservationService: StateReservationService) { }

    @Post()
    async createStateReservation(@Body() createStateReservationDto: CreateStateReservationDto,): Promise<StateReservation> {
        return this.stateReservationService.createStateReservation(createStateReservationDto);
    }

    @Get()
    async getStateReservations(): Promise<StateReservation[]> {
        return this.stateReservationService.getStateReservations();
    }

    @Get(':id')
    async getStateReservationById(@Param('id') id: number): Promise<StateReservation> {
        return this.stateReservationService.getStateReservationById(id);
    }

    @Patch(':id')
    async updateStateReservation(@Param('id') id: number, @Body() updateStateReservationDto: UpdateStateReservationDto,): Promise<StateReservation> {
        return this.stateReservationService.updateStateReservation(id, updateStateReservationDto);
    }

    @Delete(':id')
    async deleteStateReservation(@Param('id') id: number): Promise<void> {
        return this.stateReservationService.deleteStateReservation(id);
    }
}