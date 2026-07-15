import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { StoreClosureService } from '../services/store-closure.service';
import { CreateStoreClosureDto } from '../dtos/create-store-closure.dto';
import { UpdateStoreClosureDto } from '../dtos/update-store-closure.dto';

@Controller('store-closures')
export class StoreClosureController {
  constructor(private readonly closureService: StoreClosureService) { }

  @Post()
  async create(@Body() dto: CreateStoreClosureDto) {
    return this.closureService.createClosure(dto);
  }

  @Get()
  async getClosures() {
    return this.closureService.getClosures();
  }

  @Get(':id')
  async getClosureById(@Param('id') id: number) {
    return this.closureService.getClosureById(id);
  }

  @Patch(':id')
  async updateClosure(@Param('id') id: number, @Body() dto: UpdateStoreClosureDto) {
    return this.closureService.updateClosure(id, dto);
  }

  @Delete(':id')
  async deleteClosure(@Param('id') id: number) {
    return this.closureService.deleteClosure(id);
  }
}