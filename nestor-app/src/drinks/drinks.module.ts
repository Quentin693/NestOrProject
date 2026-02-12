import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';

@Module({
  providers: [DrinksService],
  controllers: [DrinksController],
  exports: [DrinksService]
})
export class DrinksModule {}
