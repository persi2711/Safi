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
import { ProyectosService } from './proyectos.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/AuthModule/auth/Decorators/get-user.decorator';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Proyectos')
@ApiBearerAuth()
@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @UseGuards(AuthGuard())
  @Post()
  create(
    @Body() createProyectoDto: CreateProyectoDto,
    @GetUser() user: Usuario,
  ) {
    return this.proyectosService.create(createProyectoDto, user);
  }
  @UseGuards(AuthGuard())
  @Get()
  findAll(@GetUser() user: Usuario) {
    return this.proyectosService.findAll(user);
  }
  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectosService.findOne(id);
  }
  @UseGuards(AuthGuard())
  @Patch('rename:id')
  update(
    @Param('id') id: string,
    @Body() updateProyectoDto: UpdateProyectoDto,
  ) {
    return this.proyectosService.update(id, updateProyectoDto);
  }
  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectosService.remove(id);
  }
}
