import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransaccionesService } from './Transacciones.service';
import { CreateTransaccionDto } from './dto/CreateTransaccion.dto';

@ApiTags('Transacciones')
@ApiBearerAuth()
@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) {}
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createTransaccionDto: CreateTransaccionDto) {
    return this.transaccionesService.create(createTransaccionDto);
  }
  @UseGuards(AuthGuard())
  @Get('selectall:id')
  findAll(@Param('id') id: string) {
    return this.transaccionesService.findAll(id);
  }
  @UseGuards(AuthGuard())
  @Get('ingreso:id')
  findOneIngreso(@Param('id') id: string) {
    return this.transaccionesService.findOneGasto(id);
  }
  @UseGuards(AuthGuard())
  @Get('gasto:id')
  findOneGasto(@Param('id') id: string) {
    return this.transaccionesService.findOneIngreso(id);
  }

  @UseGuards(AuthGuard())
  @Delete('ingreso:id')
  removeIngreso(@Param('id') id: string) {
    return this.transaccionesService.removeIngreso(id);
  }
  @UseGuards(AuthGuard())
  @Delete('gasto:id')
  removeGasto(@Param('id') id: string) {
    return this.transaccionesService.removeGasto(id);
  }
}
