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
import { TransferCuentaDto } from './dto/transfer-cuenta.dto';
@ApiTags('Transferencias')
@ApiBearerAuth()
@Controller('transfer')
export class TransferController {
  constructor(private readonly cuentasService: CuentasService) {}

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: Usuario) {
    return this.cuentasService.findAllTransfers(user);
  }
  @Patch()
  @UseGuards(AuthGuard())
  transfer(
    @Body() transferCuentaDto: TransferCuentaDto,
    @GetUser() user: Usuario,
  ) {
    return this.cuentasService.Transfer(transferCuentaDto, user);
  }
  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.cuentasService.findOneTransfer(id);
  }
}
