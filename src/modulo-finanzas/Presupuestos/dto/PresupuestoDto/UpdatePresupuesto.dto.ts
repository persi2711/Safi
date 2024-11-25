import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePresupeusto {
  @ApiProperty({
    description: 'Nombre del presupuesto',
    example: 'Presupuesto mensual',
  })
  @IsString()
  @IsOptional()
  Nombre: string;
  @ApiProperty({
    description: 'Nombre del presupuesto',
    example: 'Presupuesto mensual',
  })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  Descipcion: string;

  @ApiProperty({
    description: 'Monto total asignado al presupuesto',
    example: 1000.0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  Presupuesto: number;
}
