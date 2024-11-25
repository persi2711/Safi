import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUsuarioDdto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(50)
  Correo: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  Password: string;
}
