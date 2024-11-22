import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModuloFinanzasService } from './modulo-finanzas.service';
import { CreateModuloFinanzaDto } from './ModuloFinanzas/dto/create-modulo-finanza.dto';
import { UpdateModuloFinanzaDto } from './ModuloFinanzas/dto/update-modulo-finanza.dto';

@Controller('modulo-finanzas')
export class ModuloFinanzasController {
  constructor(private readonly moduloFinanzasService: ModuloFinanzasService) {}

  @Post()
  create(@Body() createModuloFinanzaDto: CreateModuloFinanzaDto) {
    return this.moduloFinanzasService.create(createModuloFinanzaDto);
  }

  @Get()
  findAll() {
    return this.moduloFinanzasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduloFinanzasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModuloFinanzaDto: UpdateModuloFinanzaDto,
  ) {
    return this.moduloFinanzasService.update(+id, updateModuloFinanzaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduloFinanzasService.remove(+id);
  }
}
