import { Injectable, NotFoundException } from '@nestjs/common';
import { Drink } from './drink.interface';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@Injectable()
export class DrinksService {
  private drinks: Drink[] = [
    { id: 1, name: 'Coca-Cola', price: 2.5, size: '33cl', withAlcohol: false, available: true },
    { id: 2, name: 'Orangina', price: 2.5, size: '33cl', withAlcohol: false, available: true },
    { id: 3, name: 'Eau minérale', price: 2, size: '50cl', withAlcohol: false, available: true },
    { id: 4, name: 'Bière', price: 4, size: '25cl', withAlcohol: true, available: true },
    { id: 5, name: 'Vin rouge', price: 5, size: '15cl', withAlcohol: true, available: true },
    { id: 6, name: 'Café', price: 2, size: 'tasse', withAlcohol: false, available: true },
    { id: 7, name: 'Thé', price: 2, size: 'tasse', withAlcohol: false, available: true },
  ];
  private currentId = 8;

  findAll(): Drink[] {
    return this.drinks;
  }

  findOne(id: number): Drink {
    const drink = this.drinks.find(d => d.id === id);
    if (!drink) {
      throw new NotFoundException(`Boisson avec l'ID ${id} introuvable`);
    }
    return drink;
  }

  create(createDrinkDto: CreateDrinkDto): Drink {
    const newDrink: Drink = {
      id: this.currentId++,
      ...createDrinkDto,
    };
    this.drinks.push(newDrink);
    return newDrink;
  }

  update(id: number, updateDrinkDto: UpdateDrinkDto): Drink {
    const drinkIndex = this.drinks.findIndex(d => d.id === id);
    if (drinkIndex === -1) {
      throw new NotFoundException(`Boisson avec l'ID ${id} introuvable`);
    }

    const updatedDrink = {
      ...this.drinks[drinkIndex],
      ...updateDrinkDto,
    };

    this.drinks[drinkIndex] = updatedDrink;
    return updatedDrink;
  }

  remove(id: number): void {
    const drinkIndex = this.drinks.findIndex(d => d.id === id);
    if (drinkIndex === -1) {
      throw new NotFoundException(`Boisson avec l'ID ${id} introuvable`);
    }
    this.drinks.splice(drinkIndex, 1);
  }
}
