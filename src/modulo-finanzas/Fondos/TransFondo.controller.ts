import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateTransaccionFondo } from './dto/createTransaccionFondo.dto';
import { TransaccionesFondoService } from './TransaccionesFondos.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/AuthModule/auth/Decorators/get-user.decorator';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { TransFondoService } from './TransFondo.service';
import { CreateTransFondo } from './dto/createTransFondo.dto';
@ApiTags('Transferencias Fondo-Fodo')
@ApiBearerAuth()
@Controller('transfondo')
export class TransFondoController {
  constructor(private readonly transFondoService: TransFondoService) {}
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createTransFondo: CreateTransFondo, @GetUser() user: Usuario) {
    return this.transFondoService.create(createTransFondo, user);
  }
  @UseGuards(AuthGuard())
  @Get('module:id')
  findAllbymodule(@Param('id') id: string) {
    return this.transFondoService.findAllByModule(id);
  }
  @UseGuards(AuthGuard())
  @Get('fondo:id')
  findAllbyfondo(@Param('id') id: string) {
    return this.transFondoService.findAllByFondo(id);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transFondoService.findOne(id);
  }
}
