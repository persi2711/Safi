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

export class CreateFondoDto {
  @ApiProperty({
    description: 'Nombre para el Fondo',
    example: 'Fondo para comida',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  Nombre: string;

  @ApiProperty({
    description: 'UUID del módulo de finanzas al que pertenece el fondo',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  ModuloFinanzas: string;
}
