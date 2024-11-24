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
import { FondoService } from './Fondos.service';
import { CreateFondoDto } from './dto/createFonodo.dto';
import { UpdateFondoDto } from './dto/updateFondo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/AuthModule/auth/Decorators/get-user.decorator';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { GetFondoDto } from './dto/getFondo.dto';
import { GetOneFondoDto } from './dto/getOneFondo.dto';
import { RenameFondoDto } from './dto/renameFondo.dto';
@ApiTags('Fondos')
@ApiBearerAuth()
@Controller('fondos')
export class FondosController {
  constructor(private readonly fondoService: FondoService) {}
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createFondoDto: CreateFondoDto, @GetUser() user: Usuario) {
    return this.fondoService.create(createFondoDto, user);
  }
  @UseGuards(AuthGuard())
  @Put('selectall')
  findAll(@Body() getFondoDto: GetFondoDto) {
    return this.fondoService.findAll(getFondoDto);
  }
  @UseGuards(AuthGuard())
  @Get('selectone:id')
  findOne(@Param('id') id: string) {
    return this.fondoService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch('rename')
  update(@Body() renameFondoDto: RenameFondoDto) {
    return this.fondoService.update(renameFondoDto);
  }
  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fondoService.remove(id);
  }
}
