import { Injectable } from '@nestjs/common';
import { Dessert } from './dessert.interface';

@Injectable()
export class DessertsService {
  private desserts: Dessert[] = [
    { id: 1, name: 'Tiramisu', price: 5, available: true },
    { id: 2, name: 'Panna Cotta', price: 4.5, available: true },
    { id: 3, name: 'Mousse au chocolat', price: 4, available: true },
    { id: 4, name: 'Tarte aux pommes', price: 4.5, available: true },
    { id: 5, name: 'Crème brûlée', price: 5, available: false },
  ];

  findAll(): Dessert[] {
    return this.desserts;
  }

  findOne(id: number): Dessert | undefined {
    return this.desserts.find(dessert => dessert.id === id);
  }

  create(dessert: Omit<Dessert, 'id'>): Dessert {
    const newId = Math.max(...this.desserts.map(d => d.id)) + 1;
    const newDessert: Dessert = {
      id: newId,
      ...dessert,
    };
    this.desserts.push(newDessert);
    return newDessert;
  }

  update(id: number, dessertUpdate: Partial<Dessert>): Dessert {
    const index = this.desserts.findIndex(dessert => dessert.id === id);
    if (index === -1) {
      throw new Error(`Dessert avec l'id ${id} introuvable`);
    }
    this.desserts[index] = { ...this.desserts[index], ...dessertUpdate };
    return this.desserts[index];
  }

  remove(id: number): void {
    const index = this.desserts.findIndex(dessert => dessert.id === id);
    if (index === -1) {
      throw new Error(`Dessert avec l'id ${id} introuvable`);
    }
    this.desserts.splice(index, 1);
  }
}
