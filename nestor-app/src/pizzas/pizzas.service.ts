import { Injectable } from '@nestjs/common';
import { Pizza } from './pizza.interface';

@Injectable()
export class PizzasService {
  private pizzas: Pizza[] = [
    { id: '1', name: 'Margherita', ingredients: ['tomate', 'mozzarella', 'basilic'], price: 8 },
    { id: '2', name: 'Pepperoni', ingredients: ['tomate', 'mozzarella', 'pepperoni'], price: 10 },
    { id: '3', name: '4 Fromages', ingredients: ['mozzarella', 'gorgonzola', 'parmesan', 'chèvre'], price: 12 },
    { id: '4', name: 'Savoyarde', ingredients: ['reblochon', 'lardons', 'échalotes', 'chèvre'], price: 14 },
    { id: '5', name: 'Végétarienne', ingredients: ['tomate', 'mozzarella', 'poivrons', 'oignons', 'champignons'], price: 9 },
  ];

  findAll(): Pizza[] {
    return this.pizzas;
  }

  search(maxPrice?: number, ingredient?: string): Pizza[] {
    let results = this.pizzas;

    if (maxPrice !== undefined) {
      results = results.filter(pizza => pizza.price && pizza.price <= maxPrice);
    }

    if (ingredient) {
      results = results.filter(pizza => 
        pizza.ingredients && 
        pizza.ingredients.some(ing => 
          ing.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
    }

    return results;
  }

  findOne(id: string): Pizza | undefined {
    return this.pizzas.find(pizza => pizza.id === id);
  }

  create(pizza: Omit<Pizza, 'id'>): Pizza {
    const newId = (Math.max(...this.pizzas.map(p => parseInt(p.id))) + 1).toString();
    const newPizza: Pizza = {
      id: newId,
      ...pizza,
    };
    this.pizzas.push(newPizza);
    return newPizza;
  }

  update(id: string, pizzaUpdate: Partial<Pizza>): Pizza {
    const index = this.pizzas.findIndex(pizza => pizza.id === id);
    if (index === -1) {
      throw new Error(`Pizza avec l'id ${id} introuvable`);
    }
    this.pizzas[index] = { ...this.pizzas[index], ...pizzaUpdate };
    return this.pizzas[index];
  }

  remove(id: string): void {
    const index = this.pizzas.findIndex(pizza => pizza.id === id);
    if (index === -1) {
      throw new Error(`Pizza avec l'id ${id} introuvable`);
    }
    this.pizzas.splice(index, 1);
  }
}
