import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceProvidedRepository } from '../repositories/service-provided.repository';
import { ServiceProvided } from '../entities/service-provided.entity';
import { CreateServiceDto } from '../dtos/create-service.dto';
import { UpdateServiceDto } from '../dtos/update-service.dto';

@Injectable()
export class ServiceProvidedService {
    constructor(private readonly serviceProvidedRepository: ServiceProvidedRepository) { }

    async createService(createServiceDto: CreateServiceDto): Promise<ServiceProvided> {
        return this.serviceProvidedRepository.createService(createServiceDto);
    }

    async getServices(): Promise<ServiceProvided[]> {
        return this.serviceProvidedRepository.getServices();
    }

    async getServiceById(id: number): Promise<ServiceProvided> {
        const service = await this.serviceProvidedRepository.getServiceById(id);
        if (!service) {
            throw new NotFoundException(`El servicio con ID ${id} no se encuentra`);
        }
        return service;
    }

    async updateService(id: number, updateServiceDto: UpdateServiceDto): Promise<ServiceProvided> {
        return this.serviceProvidedRepository.updateService(id, updateServiceDto);
    }

    async deleteService(id: number): Promise<void> {
        const service = await this.getServiceById(id);
        if (!service) {
            throw new NotFoundException(`El servicio con ID ${id} no se encuentra`);
        }
        await this.serviceProvidedRepository.deleteService(id);
    }
}