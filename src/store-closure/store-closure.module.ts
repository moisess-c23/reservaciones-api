import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreClosure } from './entities/store-closure.entity';
import { StoreClosureController } from './controllers/store-closure.controller';
import { StoreClosureService } from './services/store-closure.service';
import { StoreClosureRepository } from './repositories/store-closure.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StoreClosure])],
  controllers: [StoreClosureController],
  providers: [StoreClosureService, StoreClosureRepository],
  exports: [StoreClosureService, TypeOrmModule, StoreClosureRepository],
})
export class StoreClosureModule { }