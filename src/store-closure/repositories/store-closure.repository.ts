import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreClosure } from '../entities/store-closure.entity';

@Injectable()
export class StoreClosureRepository {
    constructor(
        @InjectRepository(StoreClosure)
        private readonly closureRepo: Repository<StoreClosure>,
    ) { }

    async createClosure(data: Partial<StoreClosure>): Promise<StoreClosure> {
        return this.closureRepo.save(data);
    }

    async getClosures(): Promise<StoreClosure[]> {
        return this.closureRepo.find();
    }

    async getClosureById(id: number): Promise<StoreClosure | null> {
        return this.closureRepo.findOne({ where: { id } });
    }

    async updateClosure(id: number, data: Partial<StoreClosure>): Promise<StoreClosure> {
        await this.closureRepo.update(id, data);
        return this.getClosureById(id);
    }

    async deleteClosure(id: number): Promise<void> {
        await this.closureRepo.delete(id);
    }

    async findClosuresByDay(day: string): Promise<StoreClosure[]> {
        console.log(`Buscando cierres por día: ${day}`);
        return this.closureRepo.find({ where: { day, active: true } });
    }


    async findClosuresByDate(date: string): Promise<StoreClosure[]> {
        console.log(`Buscando cierres por fecha: ${date}`);
        return this.closureRepo.find({ where: { date, active: true } });
    }

}