import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { Pizza } from './pizza.interface';

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  findAll(): Pizza[] {
    return this.pizzasService.findAll();
  }

  @Get('search')
  search(
    @Query('maxPrice') maxPrice?: string,
    @Query('ingredient') ingredient?: string,
  ): Pizza[] {
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : undefined;
    return this.pizzasService.search(maxPriceNum, ingredient);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Pizza | undefined {
    return this.pizzasService.findOne(id);
  }

  @Post()
  create(@Body() pizza: Omit<Pizza, 'id'>): Pizza {
    return this.pizzasService.create(pizza);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() pizza: Partial<Pizza>): Pizza {
    return this.pizzasService.update(id, pizza);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    this.pizzasService.remove(id);
    return { message: `Pizza ${id} supprimée avec succès` };
  }
}
