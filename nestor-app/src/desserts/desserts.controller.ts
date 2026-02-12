import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DessertsService } from './desserts.service';
import { Dessert } from './dessert.interface';

@Controller('desserts')
export class DessertsController {
  constructor(private readonly dessertsService: DessertsService) {}

  @Get()
  findAll(): Dessert[] {
    return this.dessertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Dessert | undefined {
    return this.dessertsService.findOne(id);
  }
}
