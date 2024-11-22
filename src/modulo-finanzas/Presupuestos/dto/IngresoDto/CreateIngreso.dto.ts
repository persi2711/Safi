import {
  IsDecimal,
  IsBoolean,
  IsUUID,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateIngresoDto {
  @IsDecimal({ decimal_digits: '0,2' })
  Dinero: number;
  @MaxLength(300)
  @IsString()
  @IsOptional()
  Descripcion?: string;

  @IsUUID()
  PresupuestoId: string;
}
