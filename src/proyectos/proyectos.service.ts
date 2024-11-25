import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Repository } from 'typeorm';
import { ModuloFinanzas } from 'src/modulo-finanzas/ModuloFinanzas/entities/modulo-finanza.entity';
import { Fondo } from '../modulo-finanzas/Fondos/entity/Fondos.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private proyectoRespository: Repository<Proyecto>,
    @InjectRepository(ModuloFinanzas)
    private ModuloFinanzasRepository: Repository<ModuloFinanzas>,
    @InjectRepository(Fondo)
    private fondoRepository: Repository<Fondo>,
  ) {}

  async create(createProyectoDto: CreateProyectoDto, user: Usuario) {
    const repeat = await this.proyectoRespository.findOne({
      where: { Nombre: createProyectoDto.Nombre, Usuario: user, Estado: 1 },
    });
    if (repeat) {
      throw new BadRequestException('Ya existe un proyecto con ese nombre');
    }
    const moduloFinanzas = await this.ModuloFinanzasRepository.create({
      FechaDeCreacion: Date(),
      Estado: true,
    });
    const ModuloDB = await this.ModuloFinanzasRepository.save(moduloFinanzas);
    if (!ModuloDB) {
      throw new InternalServerErrorException('No se pudo generar el modulo');
    }

    const fondo = await this.fondoRepository.create({
      ModuloFinanzas: ModuloDB,
      Estado: true,
      Efectivo: 0,
      Digital: 0,
      Total: 0,
      Tipo: 0,
      Nombre: 'Fondo General',
    });
    if (!fondo) {
      throw new InternalServerErrorException(
        'No se pudo crear el fondo general',
      );
    }
    await this.fondoRepository.save(fondo);
    const proyecto = await this.proyectoRespository.create({
      Nombre: createProyectoDto.Nombre,
      Estado: 1,
      FechaDeCreacion: Date(),
      Usuario: user,
      ModuloFinanzas: ModuloDB,
    });
    return await this.proyectoRespository.save(proyecto);
  }

  async findAll(user: Usuario) {
    return await this.proyectoRespository.find({
      where: { Usuario: user, Estado: 1 },
      relations: ['ModuloFinanzas'],
    });
  }

  async findOne(id: string) {
    const proyecto = await this.proyectoRespository.findOne({
      where: { Id: id, Estado: 1 },
      relations: ['ModuloFinanzas'],
    });
    if (!proyecto) {
      throw new NotFoundException('El proyecto no se encontro');
    }
    return proyecto;
  }

  async update(id: string, updateProyectoDto: UpdateProyectoDto) {
    const repeat = await this.proyectoRespository.findOne({
      where: { Nombre: updateProyectoDto.Nombre, Estado: 1 },
    });
    if (repeat && repeat.Id !== id) {
      throw new BadRequestException('Ya existe un proyecto con ese nombre');
    }
    const proyecto = await this.proyectoRespository.findOne({
      where: { Id: id },
    });
    if (!proyecto) {
      throw new NotFoundException('no se encotro el proyecto');
    }
    proyecto.Nombre = updateProyectoDto.Nombre;
    await this.proyectoRespository.save(proyecto);
    return proyecto;
  }

  async remove(id: string) {
    const proyecto = await this.proyectoRespository.findOne({
      where: { Id: id },
    });
    if (!proyecto) {
      throw new NotFoundException('no se encotro el proyecto');
    }
    proyecto.Estado = 0;
    await this.proyectoRespository.save(proyecto);
    return proyecto;
  }
}
