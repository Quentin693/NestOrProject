import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsArray({ message: 'Les pizzas doivent être un tableau' })
  @IsNumber({}, { each: true, message: 'Chaque ID de pizza doit être un nombre' })
  @IsOptional()
  pizzas?: number[];

  @IsArray({ message: 'Les boissons doivent être un tableau' })
  @IsNumber({}, { each: true, message: 'Chaque ID de boisson doit être un nombre' })
  @IsOptional()
  drinks?: number[];

  @IsArray({ message: 'Les desserts doivent être un tableau' })
  @IsNumber({}, { each: true, message: 'Chaque ID de dessert doit être un nombre' })
  @IsOptional()
  desserts?: number[];
}
