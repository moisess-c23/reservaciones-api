import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ServiceProvidedService } from '../services/service-provided.service';
import { ServiceProvided } from '../entities/service-provided.entity';
import { UpdateServiceDto } from '../dtos/update-service.dto';
import { CreateServiceDto } from '../dtos/create-service.dto';

@Controller('services-provided')
export class ServiceProvidedController {
    constructor(private readonly serviceProvidedService: ServiceProvidedService) { }

    @Post()
    async createService(@Body() createServiceDto: CreateServiceDto): Promise<ServiceProvided> {
        return this.serviceProvidedService.createService(createServiceDto);
    }

    @Get()
    async getServices(): Promise<ServiceProvided[]> {
        return this.serviceProvidedService.getServices();
    }

    @Get(':id')
    async getServiceById(@Param('id') id: number): Promise<ServiceProvided> {
        return this.serviceProvidedService.getServiceById(id);
    }

    @Patch(':id')
    async updateService(@Param('id') id: number, @Body() updateServiceDto: UpdateServiceDto,): Promise<ServiceProvided> {
        return this.serviceProvidedService.updateService(id, updateServiceDto);
    }

    @Delete(':id')
    async deleteService(@Param('id') id: number): Promise<void> {
        return this.serviceProvidedService.deleteService(id);
    }
}