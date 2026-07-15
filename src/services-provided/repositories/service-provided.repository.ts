import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceProvided } from '../entities/service-provided.entity';

@Injectable()
export class ServiceProvidedRepository {
    constructor(
        @InjectRepository(ServiceProvided)
        private readonly serviceRepo: Repository<ServiceProvided>) { }

    async createService(data: Partial<ServiceProvided>): Promise<ServiceProvided> {
        return this.serviceRepo.save(data);
    }

    async getServices(): Promise<ServiceProvided[]> {
        return this.serviceRepo.find();
    }

    async getServiceById(id: number): Promise<ServiceProvided | null> {
        return this.serviceRepo.findOne({ where: { id } });
    }

    async updateService(id: number, data: Partial<ServiceProvided>): Promise<ServiceProvided> {
        await this.serviceRepo.update(id, data);
        return this.getServiceById(id);
    }

    async deleteService(id: number): Promise<void> {
        await this.serviceRepo.delete(id);
    }
}