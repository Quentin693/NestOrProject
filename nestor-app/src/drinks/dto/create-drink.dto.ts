import { IsString, IsNumber, IsBoolean, Min, MinLength } from 'class-validator';

export class CreateDrinkDto {
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  name: string;

  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @Min(0, { message: 'Le prix doit être positif' })
  price: number;

  @IsString({ message: 'La taille doit être une chaîne de caractères' })
  size: string;

  @IsBoolean({ message: 'withAlcohol doit être un booléen' })
  withAlcohol: boolean;

  @IsBoolean({ message: 'available doit être un booléen' })
  available: boolean;
}
