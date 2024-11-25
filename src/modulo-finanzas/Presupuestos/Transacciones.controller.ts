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

@ApiTags('Transacciones')
@ApiBearerAuth()
@Controller('transacciones')
export class PresupuestoController {
  /*
  constructor(private readonly transaccionesService: TransaccionesService) {}
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createFondoDto: CreatePresupuestoDto) {
    return this.transaccionesService.create(createFondoDto);
  }
  @UseGuards(AuthGuard())
  @Get('selectall:id')
  findAll(@Param('id') id: string) {
    return this.transaccionesService.findAll(id);
  }
  @UseGuards(AuthGuard())
  @Get('selectone:id')
  findOne(@Param('id') id: string) {
    return this.transaccionesService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transaccionesService.remove(id);
  }
    */
}
