import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
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

  @Post()
  create(@Body() dessert: Omit<Dessert, 'id'>): Dessert {
    return this.dessertsService.create(dessert);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dessert: Partial<Dessert>,
  ): Dessert {
    return this.dessertsService.update(id, dessert);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    this.dessertsService.remove(id);
    return { message: `Dessert ${id} supprimé avec succès` };
  }
}
