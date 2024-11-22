import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsUUID,
  IsOptional,
  IsDecimal,
  Length,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateCuentaDto {
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  Nombre: string;
  @ApiProperty()
  @Min(0)
  @IsOptional()
  Dinero?: number;
  @ApiProperty()
  @IsInt()
  Tipo: number;
}
