import { IsString, IsInt, IsUUID, Length } from 'class-validator';

export class CreateProyectoDto {
  @IsString()
  @Length(1, 255)
  Nombre: string;
}
