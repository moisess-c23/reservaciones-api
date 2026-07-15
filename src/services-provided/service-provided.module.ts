import { Module } from '@nestjs/common';
import { ServiceProvidedController } from './controllers/service-provided.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProvided } from './entities/service-provided.entity';
import { ServiceProvidedService } from './services/service-provided.service';
import { ServiceProvidedRepository } from './repositories/service-provided.repository';


@Module({
  imports: [TypeOrmModule.forFeature([ServiceProvided])],
  providers: [ServiceProvidedService, ServiceProvidedRepository],
  controllers: [ServiceProvidedController],
  exports: [TypeOrmModule, ServiceProvidedService, ServiceProvidedRepository]
})
export class ServicesProvidedModule { }