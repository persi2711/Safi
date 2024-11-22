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

export class RenameCuentaDto {
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  Nombre: string;
}
