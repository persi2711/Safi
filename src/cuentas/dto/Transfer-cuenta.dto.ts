import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class TransferCuentaDto {
  @ApiProperty()
  @IsUUID()
  CuentaEnvia: string;
  @ApiProperty()
  @IsUUID()
  CuentaRecibe: string;
}
