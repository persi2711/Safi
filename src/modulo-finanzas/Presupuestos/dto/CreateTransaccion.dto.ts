import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsInt,
} from 'class-validator';

export class CreateTransaccionDto {
  @ApiProperty({
    description: 'Cantidad de dinero del ingreso',
    example: 500.0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  Dinero: number;

  @ApiProperty({
    description: 'Descripción del ingreso',
    example: 'Ingreso por venta de productos',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  Descripcion?: string;

  @ApiProperty({
    description: 'Tipo de transacción: 0 para gastos, 1 para ingreso',
    example: 1,
  })
  @IsInt()
  Tipo: number;
  @ApiProperty({
    description: 'Tipo de transacción: 0 para gastos, 1 para ingreso',
    example: 1,
  })
  @IsInt()
  TipoDinero: number;

  @ApiProperty({
    description: 'ID del presupuesto asociado al ingreso',
    example: 'fae1b1fc-1234-5678-9012-abcdef123456',
  })
  @IsUUID()
  PresupuestoId?: string;

  @ApiProperty({
    description: 'ID del módulo financiero asociado al ingreso',
    example: 'bcde2c5d-1234-5678-9012-abcdef654321',
  })
  @IsUUID()
  ModuloFinanzasId: string;
}
