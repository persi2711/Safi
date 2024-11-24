import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsDate, IsInt, IsOptional } from 'class-validator';
export class CreateTransaccionFondo {
  @ApiProperty({
    description: 'Cantidad de dinero involucrado en la transacción',
    example: 100.5,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  Dinero: number;

  @ApiProperty({
    description:
      'Tipo de transacción: 1 para Cuenta a Fondo, 2 para Fondo a Cuenta',
    example: 1,
  })
  @IsInt()
  Tipo: number;

  @ApiProperty({
    description: 'ID del fondo asociado a la transacción',
    example: 'fae1b1fc-1234-5678-9012-abcdef123456',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  FondoId?: string;

  @ApiProperty({
    description: 'ID de la cuenta asociada a la transacción',
    example: 'bcde2c5d-1234-5678-9012-abcdef654321',
  })
  @IsUUID()
  @IsOptional()
  CuentaId?: string;

  @ApiProperty({
    description: 'ID del módulo de finanzas asociado a la transacción',
    example: 'abcd1234-5678-9012-3456-abcdefabcdef',
  })
  @IsUUID()
  @IsOptional()
  ModuloFinanzasId?: string;
}
