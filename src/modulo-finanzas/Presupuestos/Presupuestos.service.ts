import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Presupuesto } from './entity/Presupuesto.entity';
import { ModuloFinanzas } from '../ModuloFinanzas/entities/modulo-finanza.entity';
import { CreatePresupuestoDto } from './dto/PresupuestoDto/CreatePresupuesto.dto';
import { UpdatePresupeusto } from './dto/PresupuestoDto/UpdatePresupuesto.dto';
import { Fondo } from '../Fondos/entity/Fondos.entity';

@Injectable()
export class PresupuestoService {
  constructor(
    @InjectRepository(Presupuesto)
    private presupuestoRepository: Repository<Presupuesto>,
    @InjectRepository(ModuloFinanzas)
    private moduloFinazasRepository: Repository<ModuloFinanzas>,
    @InjectRepository(Fondo)
    private fondoRepository: Repository<Fondo>,
  ) {}
  async create(createPresupuestoDto: CreatePresupuestoDto) {
    const modulo = await this.moduloFinazasRepository.findOne({
      where: { Id: createPresupuestoDto.ModuloFinanzasId },
    });
    if (!modulo) {
      throw new NotFoundException('No se encontro el modulo');
    }
    const fondo = await this.fondoRepository.findOne({
      where: { Id: createPresupuestoDto.FondoId },
    });
    if (!fondo) {
      throw new NotFoundException('no se encontro el fondo');
    }
    const repeat = await this.presupuestoRepository.findOne({
      where: { Nombre: createPresupuestoDto.Nombre, Estado: 1 },
    });
    if (repeat) {
      throw new BadRequestException('Ya existe un presupuesto con ese nombre');
    }
    if (createPresupuestoDto.TipoTransaccion === 0) {
      if (createPresupuestoDto.TipoPresupuesto === 1) {
        throw new BadRequestException(
          'No se pueden asignar presupuesto de ingresos',
        );
      } else if (createPresupuestoDto.TipoPresupuesto === 0) {
        const presupuesto = await this.presupuestoRepository.create({
          Nombre: createPresupuestoDto.Nombre,
          Estado: 1,
          ModuloFinanzas: modulo,
          Presupuesto: createPresupuestoDto.Presupuesto,
          Progreso: 0,
          TipoPresupuesto: createPresupuestoDto.TipoPresupuesto,
          Fondo: fondo,
          TipoTransaccion: createPresupuestoDto.TipoTransaccion,
          Descripcion: createPresupuestoDto.Descipcion,
        });
        if (!presupuesto) {
          throw new InternalServerErrorException(
            'no se pudo crear el presupuesto',
          );
        }
        return await this.presupuestoRepository.save(presupuesto);
      } else {
        throw new BadRequestException('Tipo de presupuesto desconocido');
      }
    } else if (createPresupuestoDto.TipoTransaccion === 1) {
      if (createPresupuestoDto.TipoPresupuesto === 0) {
        const presupuesto = await this.presupuestoRepository.create({
          Nombre: createPresupuestoDto.Nombre,
          Estado: 1,
          ModuloFinanzas: modulo,
          Presupuesto: createPresupuestoDto.Presupuesto,
          Progreso: 0,
          TipoPresupuesto: createPresupuestoDto.TipoPresupuesto,
          Fondo: fondo,
          TipoTransaccion: createPresupuestoDto.TipoTransaccion,
          Descripcion: createPresupuestoDto.Descipcion,
        });
        if (!presupuesto) {
          throw new InternalServerErrorException(
            'no se pudo crear el presupuesto',
          );
        }
        return await this.presupuestoRepository.save(presupuesto);
      } else if (createPresupuestoDto.TipoPresupuesto === 1) {
        if (!createPresupuestoDto.Efectivo && !createPresupuestoDto.Digital) {
          throw new BadRequestException(
            'Se ocupa dinero para crear un presupuesto asignado',
          );
        }

        const fondoAsignado = await this.fondoRepository.create({
          Estado: true,
          ModuloFinanzas: modulo,
          Efectivo: 0,
          Digital: 0,
          Total: 0,
          Tipo: 2,
          Nombre: 'Fondo asignado ' + createPresupuestoDto.Nombre,
        });
        if (!fondoAsignado) {
          throw new InternalServerErrorException('No se pudo crear el fondo');
        }
        if (createPresupuestoDto.Efectivo) {
          if (createPresupuestoDto.Efectivo > fondo.Efectivo) {
            throw new BadRequestException(
              'no hay susficientes fondos para ejecutar la accion',
            );
          }
          fondo.Efectivo =
            Number(fondo.Efectivo) - Number(createPresupuestoDto.Efectivo);
          fondo.Total =
            Number(fondo.Total) - Number(createPresupuestoDto.Efectivo);

          fondoAsignado.Efectivo =
            Number(fondoAsignado.Efectivo) +
            Number(createPresupuestoDto.Efectivo);
          fondoAsignado.Total =
            Number(fondoAsignado.Total) + Number(createPresupuestoDto.Efectivo);
        }
        if (createPresupuestoDto.Digital) {
          if (createPresupuestoDto.Digital > fondo.Digital) {
            throw new BadRequestException(
              'no hay susficientes fondos para ejecutar la accion',
            );
          }
          fondo.Digital =
            Number(fondo.Digital) - Number(createPresupuestoDto.Digital);
          fondo.Total =
            Number(fondo.Total) - Number(createPresupuestoDto.Digital);

          fondoAsignado.Digital =
            Number(fondoAsignado.Digital) +
            Number(createPresupuestoDto.Digital);
          fondoAsignado.Total =
            Number(fondoAsignado.Total) + Number(createPresupuestoDto.Digital);
        }
        if (fondoAsignado.Total !== createPresupuestoDto.Presupuesto) {
          throw new BadRequestException(
            'Presupuesto y el fondo asignado no coinciden',
          );
        }
        const fondoDB = await this.fondoRepository.save(fondoAsignado);
        if (!fondoDB) {
          throw new InternalServerErrorException(
            'no se pudo guardar el fondo asignado',
          );
        }
        const presupuesto = this.presupuestoRepository.create({
          Nombre: createPresupuestoDto.Nombre,
          Estado: 1,
          ModuloFinanzas: modulo,
          Presupuesto: createPresupuestoDto.Presupuesto,
          Progreso: 0,
          TipoPresupuesto: createPresupuestoDto.TipoPresupuesto,
          TipoTransaccion: createPresupuestoDto.TipoTransaccion,
          Descripcion: createPresupuestoDto.Descipcion,
          Fondo: fondoDB,
        });
        if (!presupuesto) {
          throw new InternalServerErrorException(
            'no se pudo guardar el presupuesto asignado',
          );
        }
        await this.fondoRepository.save(fondo);
        return this.presupuestoRepository.save(presupuesto);
      } else {
        throw new BadRequestException('Tipo de presupuesto desconocido');
      }
    } else {
      throw new BadRequestException('Tipo de transaccion desconocido');
    }
  }

  async findAll(id: string) {
    const modulo = await this.moduloFinazasRepository.findOne({
      where: { Id: id },
    });
    if (!modulo) {
      throw new NotFoundException('no se encontro el modulo');
    }
    return await this.presupuestoRepository.find({
      where: { ModuloFinanzas: modulo, Estado: 1 },
    });
  }

  async findOne(id: string) {
    const presupuesto = await this.presupuestoRepository.findOne({
      where: { Id: id, Estado: 1 },
    });
    if (!presupuesto) {
      throw new NotFoundException('No se encontro el presupuesto');
    }
    return presupuesto;
  }

  async update(updatePresupeusto: UpdatePresupeusto, id: string) {
    const presupuesto = await this.presupuestoRepository.findOne({
      where: { Id: id },
    });
    if (!presupuesto) {
      throw new NotFoundException('No se encontro el presupuesto');
    }

    if (presupuesto.TipoPresupuesto === 1) {
      throw new BadRequestException(
        'Los presupuestos fijos no se pueden modificar',
      );
    }

    if (updatePresupeusto.Presupuesto) {
      presupuesto.Presupuesto = Number(updatePresupeusto.Presupuesto);
    }

    if (updatePresupeusto.Descipcion) {
      presupuesto.Descripcion = updatePresupeusto.Descipcion;
    }
    if (updatePresupeusto.Nombre) {
      const repeat = await this.presupuestoRepository.findOne({
        where: {
          Nombre: updatePresupeusto.Nombre,
          Estado: 1,
          TipoPresupuesto: 1,
        },
      });

      if (repeat && repeat.Id !== id) {
        throw new BadRequestException(
          'Ya existe un presupuesto con ese nombre',
        );
      }
      presupuesto.Nombre = updatePresupeusto.Nombre;
    }

    return await this.presupuestoRepository.save(presupuesto);
  }

  async remove(id: string) {
    const presupuesto = await this.presupuestoRepository.findOne({
      where: { Id: id },
      relations: ['ModuloFinanzas', 'Fondo'],
    });
    if (!presupuesto) {
      throw new NotFoundException('No se encontro el presupuesto');
    }
    const modulo = presupuesto.ModuloFinanzas;
    const fondo = presupuesto.Fondo;
    if (presupuesto.TipoPresupuesto === 0) {
      presupuesto.Estado = 0;
      return await this.presupuestoRepository.save(presupuesto);
    } else if (presupuesto.TipoPresupuesto === 1) {
      const fondoGeneral = await this.fondoRepository.findOne({
        where: { Tipo: 0, ModuloFinanzas: modulo },
      });
      if (!fondoGeneral) {
        throw new InternalServerErrorException('No existe el fondo general');
      }
      fondoGeneral.Digital =
        Number(fondoGeneral.Digital) + Number(fondo.Digital);
      fondoGeneral.Efectivo =
        Number(fondoGeneral.Efectivo) + Number(fondo.Efectivo);
      fondoGeneral.Total =
        Number(fondoGeneral.Total) +
        Number(fondo.Efectivo) +
        Number(fondo.Digital);
      fondo.Efectivo = 0;
      fondo.Digital = 0;
      fondo.Estado = false;
      presupuesto.Estado = 0;

      await this.fondoRepository.save(fondo);
      await this.fondoRepository.save(fondoGeneral);
      return await this.presupuestoRepository.save(presupuesto);
    } else {
      throw new BadRequestException('El tipo de presupuesto no existe');
    }
  }
}
