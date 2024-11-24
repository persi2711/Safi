import {
  IsUUID,
  IsDecimal,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RenameFondoDto {
  @ApiProperty({
    description: 'Nombre para el Fondo',
    example: 'Fondo para comida',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  Nombre: string;

  @ApiProperty({
    description: 'UUID del Fondo que se buscara',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  FondoID: string;
}
