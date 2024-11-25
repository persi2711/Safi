import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsNumber,
  IsDate,
  IsInt,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreatePresupuestoDto {
  @ApiProperty({
    description: 'Nombre del presupuesto',
    example: 'Presupuesto mensual',
  })
  @IsString()
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
  Presupuesto: number;
  @ApiProperty({
    description: 'Monto total asignado al presupuesto',
    example: 1000.0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  Efectivo: number;
  @ApiProperty({
    description: 'Monto total asignado al presupuesto',
    example: 1000.0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  Digital: number;

  @ApiProperty({
    description: 'Tipo de presupuesto Presupuesto Asignado',
    example: 1,
  })
  @IsInt()
  TipoPresupuesto: number;

  @ApiProperty({
    description:
      'Tipo de transacción asociada al presupuesto (ejemplo: 1 para ingreso, 2 para gasto)',
    example: 1,
  })
  @IsInt()
  TipoTransaccion: number;

  @ApiProperty({
    description: 'ID del módulo financiero asociado al presupuesto',
    example: 'fae1b1fc-1234-5678-9012-abcdef123456',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  ModuloFinanzasId: string;
  @ApiProperty({
    description: 'ID del módulo presupuesto',
    example: 'fae1b1fc-1234-5678-9012-abcdef123456',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  FondoId: string;
}
