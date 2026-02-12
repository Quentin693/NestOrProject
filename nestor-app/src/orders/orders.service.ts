import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Order } from './order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PizzasService } from '../pizzas/pizzas.service';
import { DrinksService } from '../drinks/drinks.service';
import { DessertsService } from '../desserts/desserts.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private currentId = 1;
  private readonly dataFile = path.join(process.cwd(), 'data', 'orders.json');

  constructor(
    private readonly pizzasService: PizzasService,
    private readonly drinksService: DrinksService,
    private readonly dessertsService: DessertsService,
  ) {
    this.loadOrders();
  }

  private loadOrders(): void {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = fs.readFileSync(this.dataFile, 'utf-8');
        const loadedOrders = JSON.parse(data);
        this.orders = loadedOrders.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
        }));
        if (this.orders.length > 0) {
          this.currentId = Math.max(...this.orders.map(o => o.id)) + 1;
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
    }
  }

  private saveOrders(): void {
    try {
      const dir = path.dirname(this.dataFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.dataFile, JSON.stringify(this.orders, null, 2));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des commandes:', error);
    }
  }

  private validateAndCalculatePrice(
    pizzaIds: number[] = [],
    drinkIds: number[] = [],
    dessertIds: number[] = [],
  ): number {
    let totalPrice = 0;
    const allPizzas = this.pizzasService.findAll();
    const allDrinks = this.drinksService.findAll();
    const allDesserts = this.dessertsService.findAll();

    // Valider et calculer le prix des pizzas
    for (const pizzaId of pizzaIds) {
      const pizza = allPizzas.find(p => parseInt(p.id) === pizzaId);
      if (!pizza) {
        throw new NotFoundException(`Pizza avec l'ID ${pizzaId} introuvable`);
      }
      // Note: Les pizzas n'ont pas de champ "available" dans le modèle actuel
      totalPrice += pizza.price || 0;
    }

    // Valider et calculer le prix des boissons
    let hasNonAlcoholicDrink = false;
    for (const drinkId of drinkIds) {
      const drink = allDrinks.find(d => d.id === drinkId);
      if (!drink) {
        throw new NotFoundException(`Boisson avec l'ID ${drinkId} introuvable`);
      }
      if (!drink.available) {
        throw new BadRequestException(`Boisson "${drink.name}" n'est pas disponible`);
      }
      totalPrice += drink.price;
      
      // Vérifier si c'est une boisson sans alcool
      if (!drink.withAlcohol) {
        hasNonAlcoholicDrink = true;
      }
    }

    // Valider et calculer le prix des desserts
    for (const dessertId of dessertIds) {
      const dessert = allDesserts.find(d => d.id === dessertId);
      if (!dessert) {
        throw new NotFoundException(`Dessert avec l'ID ${dessertId} introuvable`);
      }
      if (!dessert.available) {
        throw new BadRequestException(`Dessert "${dessert.name}" n'est pas disponible`);
      }
      totalPrice += dessert.price;
    }

    // Règle métier du menu promotionnel :
    // Si la commande contient au moins 1 pizza + 1 boisson SANS alcool + 1 dessert
    // Alors appliquer une réduction de 10% sur la somme des 3 éléments
    const hasPizza = pizzaIds.length >= 1;
    const hasDessert = dessertIds.length >= 1;
    
    if (hasPizza && hasNonAlcoholicDrink && hasDessert) {
      // Appliquer la réduction de 10%
      totalPrice = totalPrice * 0.9;
    }

    return Math.round(totalPrice * 100) / 100; // Arrondir à 2 décimales
  }

  findAll(processed?: boolean): Order[] {
    if (processed !== undefined) {
      return this.orders.filter(order => order.processed === processed);
    }
    return this.orders;
  }

  findOne(id: number): Order {
    const order = this.orders.find(o => o.id === id);
    if (!order) {
      throw new NotFoundException(`Commande avec l'ID ${id} introuvable`);
    }
    return order;
  }

  create(createOrderDto: CreateOrderDto): Order {
    const pizzas = createOrderDto.pizzas || [];
    const drinks = createOrderDto.drinks || [];
    const desserts = createOrderDto.desserts || [];

    // Vérifier qu'il y a au moins un élément dans la commande
    if (pizzas.length === 0 && drinks.length === 0 && desserts.length === 0) {
      throw new BadRequestException('La commande doit contenir au moins un élément');
    }

    const totalPrice = this.validateAndCalculatePrice(pizzas, drinks, desserts);

    const newOrder: Order = {
      id: this.currentId++,
      pizzas,
      drinks,
      desserts,
      totalPrice,
      processed: false,
      createdAt: new Date(),
    };
    
    this.orders.push(newOrder);
    this.saveOrders();
    return newOrder;
  }

  update(id: number, updateOrderDto: UpdateOrderDto): Order {
    const orderIndex = this.orders.findIndex(o => o.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Commande avec l'ID ${id} introuvable`);
    }

    const currentOrder = this.orders[orderIndex];
    
    const pizzas = updateOrderDto.pizzas !== undefined ? updateOrderDto.pizzas : currentOrder.pizzas;
    const drinks = updateOrderDto.drinks !== undefined ? updateOrderDto.drinks : currentOrder.drinks;
    const desserts = updateOrderDto.desserts !== undefined ? updateOrderDto.desserts : currentOrder.desserts;

    // Recalculer le prix si les items ont changé
    let totalPrice = currentOrder.totalPrice;
    if (updateOrderDto.pizzas !== undefined || 
        updateOrderDto.drinks !== undefined || 
        updateOrderDto.desserts !== undefined) {
      totalPrice = this.validateAndCalculatePrice(pizzas, drinks, desserts);
    }

    const updatedOrder: Order = {
      ...currentOrder,
      ...updateOrderDto,
      pizzas,
      drinks,
      desserts,
      totalPrice,
    };

    this.orders[orderIndex] = updatedOrder;
    this.saveOrders();
    return updatedOrder;
  }

  remove(id: number): void {
    const orderIndex = this.orders.findIndex(o => o.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Commande avec l'ID ${id} introuvable`);
    }
    this.orders.splice(orderIndex, 1);
    this.saveOrders();
  }

  markAsProcessed(id: number): Order {
    const order = this.findOne(id);
    order.processed = true;
    this.saveOrders();
    return order;
  }

  updateField(id: number, field: string, value: any): Order {
    const order = this.findOne(id);
    
    if (field === 'price') {
      order.totalPrice = parseFloat(value);
    } else if (field in order) {
      (order as any)[field] = value;
    }
    
    this.saveOrders();
    return order;
  }
}
