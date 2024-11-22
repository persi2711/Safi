import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class TransferCuentaDto {
  @ApiProperty()
  @IsString()
  CuentaEnvia: string;
  @ApiProperty()
  @IsString()
  CuentaRecibe: string;
  @ApiProperty()
  @Min(0)
  @IsNumber()
  Dinero: number;
}
