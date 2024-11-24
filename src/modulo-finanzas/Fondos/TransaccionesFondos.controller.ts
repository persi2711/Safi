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
@ApiTags('Transferencias Fondo-Cuentas')
@ApiBearerAuth()
@Controller('Transaccionescf')
export class TransaccionesFondosController {
  constructor(
    private readonly transaccionesFondoService: TransaccionesFondoService,
  ) {}
  @UseGuards(AuthGuard())
  @Post()
  create(
    @Body() createExtraccionFondo: CreateTransaccionFondo,
    @GetUser() user: Usuario,
  ) {
    return this.transaccionesFondoService.create(createExtraccionFondo, user);
  }
  @UseGuards(AuthGuard())
  @Get()
  findAllbyuser(@GetUser() user: Usuario) {
    return this.transaccionesFondoService.findAllByUser(user);
  }
  @UseGuards(AuthGuard())
  @Get('module:id')
  findAllbymodule(@Param('id') id: string) {
    return this.transaccionesFondoService.findAllByModule(id);
  }
  @UseGuards(AuthGuard())
  @Get('cuenta:id')
  findAllbycuenta(@Param('id') id: string) {
    return this.transaccionesFondoService.findAllByCuenta(id);
  }
  @UseGuards(AuthGuard())
  @Get('fondo:id')
  findAllbyfondo(@Param('id') id: string) {
    return this.transaccionesFondoService.findAllByFondo(id);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transaccionesFondoService.findOne(id);
  }
}
