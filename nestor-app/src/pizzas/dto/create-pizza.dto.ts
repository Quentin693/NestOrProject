import { IsString, IsArray, IsNumber, IsOptional, Min, ArrayMinSize } from 'class-validator';

export class CreatePizzaDto {
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name: string;

  @IsArray({ message: 'Les ingrédients doivent être un tableau' })
  @ArrayMinSize(1, { message: 'Il faut au moins un ingrédient' })
  @IsString({ each: true, message: 'Chaque ingrédient doit être une chaîne de caractères' })
  @IsOptional()
  ingredients?: string[];

  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @Min(0, { message: 'Le prix doit être positif' })
  @IsOptional()
  price?: number;
}
