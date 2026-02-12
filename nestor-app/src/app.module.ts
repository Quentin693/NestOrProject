import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzasModule } from './pizzas/pizzas.module';
import { OrdersModule } from './orders/orders.module';
import { DrinksModule } from './drinks/drinks.module';
import { DessertsModule } from './desserts/desserts.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [PizzasModule, OrdersModule, DrinksModule, DessertsModule, MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
