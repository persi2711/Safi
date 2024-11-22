import { Injectable } from '@nestjs/common';
import { CreateModuloFinanzaDto } from './ModuloFinanzas/dto/create-modulo-finanza.dto';
import { UpdateModuloFinanzaDto } from './ModuloFinanzas/dto/update-modulo-finanza.dto';

@Injectable()
export class ModuloFinanzasService {
  create(createModuloFinanzaDto: CreateModuloFinanzaDto) {
    return 'This action adds a new moduloFinanza';
  }

  findAll() {
    return `This action returns all moduloFinanzas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moduloFinanza`;
  }

  update(id: number, updateModuloFinanzaDto: UpdateModuloFinanzaDto) {
    return `This action updates a #${id} moduloFinanza`;
  }

  remove(id: number) {
    return `This action removes a #${id} moduloFinanza`;
  }
}
