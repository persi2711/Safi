import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsUUID } from 'class-validator';

export class CreateTransFondo {
  @ApiProperty({
    description: 'Cantidad de dinero involucrado en la transacción',
    example: 100.5,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  Dinero: number;

  @ApiProperty({
    description: 'Tipo de transacción: 0 para efectivo a Fondo, 1 para digital',
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
  FondoEnvia?: string;
  @ApiProperty({
    description: 'ID del fondo asociado a la transacción',
    example: 'fae1b1fc-1234-5678-9012-abcdef123456',
    nullable: true,
  })
  @IsUUID()
  FondoRecibe?: string;

  @ApiProperty({
    description: 'ID del módulo de finanzas asociado a la transacción',
    example: 'abcd1234-5678-9012-3456-abcdefabcdef',
  })
  @IsUUID()
  ModuloFinanzasId?: string;
}
