import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PizzasModule } from '../pizzas/pizzas.module';
import { DrinksModule } from '../drinks/drinks.module';
import { DessertsModule } from '../desserts/desserts.module';

@Module({
  imports: [PizzasModule, DrinksModule, DessertsModule],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
