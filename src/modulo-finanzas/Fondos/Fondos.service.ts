import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFondoDto } from './dto/createFonodo.dto';
import { UpdateFondoDto } from './dto/updateFondo.dto';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Fondo } from './entity/Fondos.entity';
import { Repository } from 'typeorm';
import { ModuloFinanzas } from '../ModuloFinanzas/entities/modulo-finanza.entity';
import { GetFondoDto } from './dto/getFondo.dto';
import { GetOneFondoDto } from './dto/getOneFondo.dto';
import { RenameFondoDto } from './dto/renameFondo.dto';

@Injectable()
export class FondoService {
  constructor(
    @InjectRepository(Fondo)
    private fondoRepository: Repository<Fondo>,
    @InjectRepository(ModuloFinanzas)
    private moduloFinazasRepository: Repository<ModuloFinanzas>,
  ) {}
  async create(createFondoDto: CreateFondoDto, user: Usuario) {
    const modulo = await this.moduloFinazasRepository.findOne({
      where: { Id: createFondoDto.ModuloFinanzas },
    });
    if (!modulo) {
      throw new NotFoundException('no se encontro el modulo');
    }
    const repeat = await this.fondoRepository.findOne({
      where: {
        Nombre: createFondoDto.Nombre,
        ModuloFinanzas: modulo,
        Estado: true,
      },
    });
    if (repeat) {
      throw new BadRequestException('ya existe un fondo con ese nombre');
    }

    const fondo = await this.fondoRepository.create({
      FechaDeCreacion: Date(),
      Estado: true,
      Efectivo: 0,
      Digital: 0,
      Total: 0,
      Tipo: 1,
      Nombre: createFondoDto.Nombre,
      ModuloFinanzas: modulo,
    });

    return await this.fondoRepository.save(fondo);
  }

  async findAll(getFondoDto: GetFondoDto) {
    const modulo = await this.moduloFinazasRepository.findOne({
      where: { Id: getFondoDto.ModuloFinanzas },
    });
    if (!modulo) {
      throw new NotFoundException('No se encontro el modulo');
    }

    return await this.fondoRepository.find({
      where: { ModuloFinanzas: modulo, Estado: true, Tipo: 1 && 0 },
    });
  }
  async findAllAsignados(getFondoDto: GetFondoDto) {
    const modulo = await this.moduloFinazasRepository.findOne({
      where: { Id: getFondoDto.ModuloFinanzas },
    });
    if (!modulo) {
      throw new NotFoundException('No se encontro el modulo');
    }

    return await this.fondoRepository.find({
      where: { ModuloFinanzas: modulo, Estado: true, Tipo: 2 },
    });
  }

  async findOne(id: string) {
    const fondo = await this.fondoRepository.findOne({
      where: { Id: id, Estado: true },
    });

    if (!fondo) {
      throw new NotFoundException('no se encotro el fondo');
    }
    return fondo;
  }

  async update(renameFondoDto: RenameFondoDto) {
    const repeat = await this.fondoRepository.findOne({
      where: { Nombre: renameFondoDto.Nombre, Estado: true },
    });
    if (repeat && repeat.Id !== renameFondoDto.FondoID) {
      throw new BadRequestException('ya existe un fondo con ese nombre');
    }
    const fondo = await this.fondoRepository.findOne({
      where: { Id: renameFondoDto.FondoID },
    });
    if (!fondo) {
      throw new NotFoundException('no se encontro el fondo');
    }
    fondo.Nombre = renameFondoDto.Nombre;
    return this.fondoRepository.save(fondo);
  }

  async remove(id: string) {
    const fondo = await this.fondoRepository.findOne({
      where: { Id: id, Estado: true },
    });

    if (!fondo) {
      throw new NotFoundException('no se encotro el fondo');
    }
    if (fondo.Tipo === 0) {
      throw new BadRequestException('NO se puede eliminar el fondo general');
    }
    if (fondo.Tipo === 2) {
      throw new BadRequestException(
        'NO se puede eliminar un fondo asignado, elimine el presupuesto para liberar los fondos',
      );
    }
    if (fondo.Total !== 0) {
      throw new BadRequestException(
        'NO se puede eliminar un fondo dinero, mueva el dinero a otro fondo antes de eliminarlo',
      );
    }
    fondo.Estado = false;
    return await this.fondoRepository.save(fondo);
  }
}
