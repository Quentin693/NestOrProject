import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { Drink } from './drink.interface';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  findAll(): Drink[] {
    return this.drinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Drink {
    return this.drinksService.findOne(id);
  }

  @Post()
  create(@Body() createDrinkDto: CreateDrinkDto): Drink {
    return this.drinksService.create(createDrinkDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDrinkDto: UpdateDrinkDto,
  ): Drink {
    return this.drinksService.update(id, updateDrinkDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    this.drinksService.remove(id);
    return { message: `Boisson ${id} supprimée avec succès` };
  }
}
