import { IsString, IsNumber, IsBoolean, IsOptional, Min, MinLength } from 'class-validator';

export class UpdateDrinkDto {
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  @IsOptional()
  name?: string;

  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @Min(0, { message: 'Le prix doit être positif' })
  @IsOptional()
  price?: number;

  @IsString({ message: 'La taille doit être une chaîne de caractères' })
  @IsOptional()
  size?: string;

  @IsBoolean({ message: 'withAlcohol doit être un booléen' })
  @IsOptional()
  withAlcohol?: boolean;

  @IsBoolean({ message: 'available doit être un booléen' })
  @IsOptional()
  available?: boolean;
}
