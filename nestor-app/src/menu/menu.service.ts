import { Injectable } from '@nestjs/common';
import { PizzasService } from '../pizzas/pizzas.service';
import { DrinksService } from '../drinks/drinks.service';
import { DessertsService } from '../desserts/desserts.service';

@Injectable()
export class MenuService {
  constructor(
    private readonly pizzasService: PizzasService,
    private readonly drinksService: DrinksService,
    private readonly dessertsService: DessertsService,
  ) {}

  getFullMenu() {
    return {
      pizzas: this.pizzasService.findAll(),
      drinks: this.drinksService.findAll(),
      desserts: this.dessertsService.findAll(),
    };
  }

  getMenuByCategory(category: string) {
    switch (category) {
      case 'pizzas':
        return this.pizzasService.findAll();
      case 'drinks':
        return this.drinksService.findAll();
      case 'desserts':
        return this.dessertsService.findAll();
      default:
        return null;
    }
  }
}
