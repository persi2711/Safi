import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetFondoDto {
  @ApiProperty({
    description: 'UUID del módulo de finanzas al que pertenece el fondo',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  ModuloFinanzas: string;
}
