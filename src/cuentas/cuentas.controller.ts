import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/AuthModule/auth/Decorators/get-user.decorator';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RenameCuentaDto } from './dto/rename-cuenta.dto';
import { TransferCuentaDto } from './dto/Transfer-cuenta.dto';
@ApiTags('Cuentas')
@ApiBearerAuth()
@Controller('cuentas')
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createCuentaDto: CreateCuentaDto, @GetUser() user: Usuario) {
    return this.cuentasService.create(createCuentaDto, user);
  }

  @Get('banco')
  @UseGuards(AuthGuard())
  findAllbanco(@GetUser() user: Usuario) {
    return this.cuentasService.findAllBanco(user);
  }
  @Get('efectivo')
  @UseGuards(AuthGuard())
  findAllefectivo(@GetUser() user: Usuario) {
    return this.cuentasService.findAllEfectivo(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.cuentasService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateCuentaDto: UpdateCuentaDto) {
    return this.cuentasService.update(id, updateCuentaDto);
  }

  @Patch('rename/:id')
  @UseGuards(AuthGuard())
  rename(@Param('id') id: string, @Body() renameCuentaDto: RenameCuentaDto) {
    return this.cuentasService.rename(id, renameCuentaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.cuentasService.remove(id);
  }
}
