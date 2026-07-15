import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { StoreClosureRepository } from '../repositories/store-closure.repository';
import { CreateStoreClosureDto } from '../dtos/create-store-closure.dto';
import { UpdateStoreClosureDto } from '../dtos/update-store-closure.dto';

@Injectable()
export class StoreClosureService {
  constructor(private readonly closureRepo: StoreClosureRepository) { }

  async createClosure(dto: CreateStoreClosureDto) {
    return this.closureRepo.createClosure(dto);
  }

  async getClosures() {
    return this.closureRepo.getClosures();
  }

  async getClosureById(id: number) {
    const closure = await this.closureRepo.getClosureById(id);
    if (!closure) {
      throw new NotFoundException(`El cierre con ID ${id} no existe.`);
    }
    return closure;
  }

  async updateClosure(id: number, dto: UpdateStoreClosureDto) {
    const closure = await this.closureRepo.updateClosure(id, dto);
    if (!closure) {
      throw new NotFoundException(`El cierre con ID ${id} no existe.`);
    }
    return closure;
  }

  async deleteClosure(id: number) {
    await this.closureRepo.deleteClosure(id);
  }

  async checkIfStoreIsClosed(
    date: string,
    day: string,
    time?: string,
  ): Promise<{
    isClosed: boolean;
    message?: string;
    suggested_time?: string;
  }> {
    console.log(`Validando cierre de tienda para fecha: ${date}, día: ${day}, hora: ${time}`);

    const closuresByDate = await this.closureRepo.findClosuresByDate(date);
    console.log('Cierres por fecha:', closuresByDate);

    if (closuresByDate.some((closure) => closure.all_day)) {
      return {
        isClosed: true,
        message: 'La tienda está cerrada todo el día por una fecha específica.',
      };
    }

    if (
      time &&
      closuresByDate.some(
        (closure) =>
          closure.start_time &&
          closure.end_time &&
          time >= closure.start_time &&
          time <= closure.end_time,
      )
    ) {
      const closure = closuresByDate.find(
        (c) =>
          c.start_time &&
          c.end_time &&
          time >= c.start_time &&
          time <= c.end_time,
      );
      return {
        isClosed: true,
        message: `La tienda está cerrada de ${closure.start_time} a ${closure.end_time} por una fecha específica.`,
        suggested_time: this.addMinutes(closure.end_time, 30),
      };
    }

    const closuresByDay = await this.closureRepo.findClosuresByDay(day);
    console.log('Cierres por día:', closuresByDay);

    for (const closure of closuresByDay) {
      if (closure.recurring_day) {
        return {
          isClosed: true,
          message: 'La tienda está cerrada de manera recurrente en este día.',
        };
      }

      if (closure.start_time && closure.end_time) {
        if (time >= closure.start_time && time <= closure.end_time) {
          return {
            isClosed: true,
            message: `La tienda está cerrada de ${closure.start_time} a ${closure.end_time} de manera recurrente.`,
            suggested_time: this.addMinutes(closure.end_time, 30),
          };
        }
      }
    }

    console.log('No hay cierres aplicables para la tienda.');
    return { isClosed: false };
  }




  private addMinutes(time: string, minutes: number): string {
    const [hour, minute] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute + minutes, 0);
    return date.toTimeString().slice(0, 5);
  }
}