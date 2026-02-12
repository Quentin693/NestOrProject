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
}
