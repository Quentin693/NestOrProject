import { Controller, Get, Query } from '@nestjs/common';
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
}
