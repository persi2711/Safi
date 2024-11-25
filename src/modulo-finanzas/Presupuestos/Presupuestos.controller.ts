import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePresupuestoDto } from './dto/PresupuestoDto/CreatePresupuesto.dto';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { GetUser } from 'src/AuthModule/auth/Decorators/get-user.decorator';
import { PresupuestoService } from './Presupuestos.service';
import { UpdatePresupeusto } from './dto/PresupuestoDto/UpdatePresupuesto.dto';

@ApiTags('Presupuestos')
@ApiBearerAuth()
@Controller('presupuestos')
export class PresupuestoController {
  constructor(private readonly presupuestoService: PresupuestoService) {}
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createFondoDto: CreatePresupuestoDto) {
    return this.presupuestoService.create(createFondoDto);
  }
  @UseGuards(AuthGuard())
  @Get('selectall:id')
  findAll(@Param('id') id: string) {
    return this.presupuestoService.findAll(id);
  }
  @UseGuards(AuthGuard())
  @Get('selectone:id')
  findOne(@Param('id') id: string) {
    return this.presupuestoService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch('rename:id')
  update(
    @Body() updatePresupeusto: UpdatePresupeusto,
    @Param('id') id: string,
  ) {
    return this.presupuestoService.update(updatePresupeusto, id);
  }
  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presupuestoService.remove(id);
  }
}
