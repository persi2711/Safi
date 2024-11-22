import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  Nombre: string;
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  Apellido: string;
  @ApiProperty()
  @IsEmail()
  @MaxLength(50)
  Correo: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  Password: string;
}
