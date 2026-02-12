import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PizzasModule } from '../pizzas/pizzas.module';
import { DrinksModule } from '../drinks/drinks.module';
import { DessertsModule } from '../desserts/desserts.module';

@Module({
  imports: [PizzasModule, DrinksModule, DessertsModule],
  providers: [MenuService],
  controllers: [MenuController]
})
export class MenuModule {}
