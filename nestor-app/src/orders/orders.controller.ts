import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Patch, 
  Body, 
  Param, 
  Query,
  ParseIntPipe 
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Query('processed') processed?: string): Order[] {
    if (processed !== undefined) {
      const isProcessed = processed === 'true';
      return this.ordersService.findAll(isProcessed);
    }
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Order {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Order {
    return this.ordersService.create(createOrderDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Order {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    this.ordersService.remove(id);
    return { message: `Commande ${id} supprimée avec succès` };
  }

  @Patch(':id/processed')
  markAsProcessed(@Param('id', ParseIntPipe) id: number): Order {
    return this.ordersService.markAsProcessed(id);
  }

  @Patch(':id')
  updateField(
    @Param('id', ParseIntPipe) id: number,
    @Query('field') field: string,
    @Query('value') value: string,
  ): Order {
    return this.ordersService.updateField(id, field, value);
  }
}
