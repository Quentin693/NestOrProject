import { IsArray, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';

export class UpdateOrderDto {
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

  @IsNumber({}, { message: 'Le prix total doit être un nombre' })
  @Min(0, { message: 'Le prix total doit être positif' })
  @IsOptional()
  totalPrice?: number;

  @IsBoolean({ message: 'Le statut processed doit être un booléen' })
  @IsOptional()
  processed?: boolean;
}
