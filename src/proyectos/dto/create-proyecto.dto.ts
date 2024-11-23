import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsUUID, Length } from 'class-validator';

export class CreateProyectoDto {
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  Nombre: string;
}
