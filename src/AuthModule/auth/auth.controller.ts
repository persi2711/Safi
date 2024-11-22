import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDdto } from '../usuarios/dto/Login-usuario.dto';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { Console } from 'console';
import { GetUser } from './Decorators/get-user.decorator';
import { Usuario } from '../usuarios/entities/usuario.entity';

import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() loginUsuarioDto: LoginUsuarioDdto) {
    return this.authService.login(loginUsuarioDto);
  }
  @Post('register')
  register(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.register(createUsuarioDto);
  }
}
