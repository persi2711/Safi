import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransaccionDto } from './dto/CreateTransaccion.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuloFinanzas } from '../ModuloFinanzas/entities/modulo-finanza.entity';
import { Ingreso } from './entity/Ingreso.entity';
import { Gasto } from './entity/Gasto.entity';
import { Fondo } from '../Fondos/entity/Fondos.entity';
import { Presupuesto } from './entity/Presupuesto.entity';

@Injectable()
export class TransaccionesService {
  constructor(
    @InjectRepository(ModuloFinanzas)
    private moduloFinanzasRepository: Repository<ModuloFinanzas>,
    @InjectRepository(Ingreso)
    private ingresoRepository: Repository<Ingreso>,
    @InjectRepository(Gasto)
    private gastoRepository: Repository<Gasto>,
    @InjectRepository(Fondo)
    private fondoRepository: Repository<Fondo>,
    @InjectRepository(Presupuesto)
    private presupuestoRepository: Repository<Presupuesto>,
  ) {}

  async create(createTransaccionDto: CreateTransaccionDto) {
    const modulo = await this.moduloFinanzasRepository.findOne({
      where: { Id: createTransaccionDto.ModuloFinanzasId },
    });
    if (!modulo) {
      throw new NotFoundException('No se encontro el modulo');
    }
    const presupuesto = await this.presupuestoRepository.findOne({
      where: { Id: createTransaccionDto.PresupuestoId },
      relations: ['Fondo'],
    });
    if (!presupuesto) {
      throw new NotFoundException('No se encontro el presupuesto');
    }
    const fondo = presupuesto.Fondo;
    if (createTransaccionDto.Tipo === 1) {
      const gasto = await this.gastoRepository.create({
        Dinero: createTransaccionDto.Dinero,
        Descripcion: createTransaccionDto.Descripcion,
        Estado: true,
        Presupuesto: presupuesto,
        ModuloFinanzas: modulo,
        TipoDinero: createTransaccionDto.TipoDinero,
      });
      if (gasto.TipoDinero === 0) {
        if (presupuesto.TipoTransaccion !== 1) {
          throw new BadRequestException(
            'el tipo de transaccion no esta permitada sobre el presupuesto seleccionado',
          );
        }
        if (gasto.Dinero > fondo.Efectivo) {
          throw new BadRequestException(
            'El fondo no tiene suficiente dinero para cubrir el gasto',
          );
        }
        fondo.Efectivo = Number(fondo.Efectivo) - Number(gasto.Dinero);
        fondo.Total = Number(fondo.Total) - Number(gasto.Dinero);
        presupuesto.Progreso =
          Number(presupuesto.Progreso) + Number(gasto.Dinero);
        await this.fondoRepository.save(fondo);
        await this.presupuestoRepository.save(presupuesto);
        return await this.gastoRepository.save(gasto);
      } else if (gasto.TipoDinero === 1) {
        if (gasto.Dinero > fondo.Digital) {
          throw new BadRequestException(
            'El fondo no tiene suficiente dinero para cubrir el gasto',
          );
        }
        fondo.Digital = Number(fondo.Digital) - Number(gasto.Dinero);
        fondo.Total = Number(fondo.Total) - Number(gasto.Dinero);
        presupuesto.Progreso =
          Number(presupuesto.Progreso) + Number(gasto.Dinero);
        await this.fondoRepository.save(fondo);
        await this.presupuestoRepository.save(presupuesto);
        return await this.gastoRepository.save(gasto);
      } else {
        throw new BadRequestException('El tipo de dinero no es valido');
      }
    } else if (createTransaccionDto.Tipo === 0) {
      const ingreso = await this.ingresoRepository.create({
        Dinero: createTransaccionDto.Dinero,
        Descripcion: createTransaccionDto.Descripcion,
        Estado: true,
        Presupuesto: presupuesto,
        ModuloFinanzas: modulo,
        TipoDinero: createTransaccionDto.TipoDinero,
      });
      if (presupuesto.TipoTransaccion > 0) {
        throw new BadRequestException(
          'el tipo de transaccion no esta permitada sobre el presupuesto seleccionado',
        );
      }
      if (ingreso.TipoDinero === 0) {
        fondo.Efectivo = Number(fondo.Efectivo) + Number(ingreso.Dinero);
        fondo.Total = Number(fondo.Total) + Number(ingreso.Dinero);
        presupuesto.Progreso =
          Number(presupuesto.Progreso) + Number(ingreso.Dinero);
        await this.fondoRepository.save(fondo);
        await this.presupuestoRepository.save(presupuesto);
        return await this.gastoRepository.save(ingreso);
      } else if (ingreso.TipoDinero === 1) {
        fondo.Digital = Number(fondo.Digital) + Number(ingreso.Dinero);
        fondo.Total = Number(fondo.Total) + Number(ingreso.Dinero);
        presupuesto.Progreso =
          Number(presupuesto.Progreso) + Number(ingreso.Dinero);
        await this.fondoRepository.save(fondo);
        await this.presupuestoRepository.save(presupuesto);
        return await this.gastoRepository.save(ingreso);
      } else {
        throw new BadRequestException('El tipo de dinero no es valido');
      }
    } else {
      throw new BadRequestException('El tipo de Transaccion no es valido');
    }
  }

  async findAll(id: string) {
    const modulo = await this.moduloFinanzasRepository.findOne({
      where: { Id: id },
    });
    if (!modulo) {
      throw new NotFoundException('no se encontro el modulo');
    }
    const ingresos = await this.ingresoRepository.find({
      where: { ModuloFinanzas: modulo },
      relations: ['Presupuesto'],
    });
    const gastos = await this.gastoRepository.find({
      where: { ModuloFinanzas: modulo },
      relations: ['Presupuesto'],
    });
    const result = ingresos.concat(gastos);
    return result.sort(
      (a, b) => b.FechaDeCreacion.getTime() - a.FechaDeCreacion.getTime(),
    );
  }

  async findOneIngreso(id: string) {
    const ingreso = await this.ingresoRepository.findOne({ where: { Id: id } });
    if (!ingreso) {
      throw new NotFoundException('No se encontro el gasto');
    }
    return ingreso;
  }

  async findOneGasto(id: string) {
    const gasto = await this.gastoRepository.findOne({ where: { Id: id } });
    if (!gasto) {
      throw new NotFoundException('No se encontro el gasto');
    }
    return gasto;
  }

  async removeIngreso(id: string) {
    const ingreso = await this.ingresoRepository.findOne({
      where: { Id: id },
      relations: ['Presupuesto', 'Presupuesto.Fondo'],
    });
    if (!ingreso) {
      throw new NotFoundException('No se encontro el presupuesto ');
    }
    const presupuesto = ingreso.Presupuesto;
    const fondo = ingreso.Presupuesto.Fondo;

    if (ingreso.TipoDinero === 0) {
      presupuesto.Progreso =
        Number(presupuesto.Progreso) - Number(ingreso.Dinero);
      fondo.Efectivo = Number(fondo.Efectivo) - Number(ingreso.Dinero);
      fondo.Total = Number(fondo.Total) - Number(ingreso.Dinero);
      await this.presupuestoRepository.save(presupuesto);
      await this.fondoRepository.save(fondo);
      return await this.ingresoRepository.remove(ingreso);
    } else if (ingreso.TipoDinero === 1) {
      presupuesto.Progreso =
        Number(presupuesto.Progreso) - Number(ingreso.Dinero);
      fondo.Digital = Number(fondo.Digital) - Number(ingreso.Dinero);
      fondo.Total = Number(fondo.Total) - Number(ingreso.Dinero);
      await this.presupuestoRepository.save(presupuesto);
      await this.fondoRepository.save(fondo);
      return await this.ingresoRepository.remove(ingreso);
    } else {
      throw new InternalServerErrorException('algo salio mal');
    }
  }
  async removeGasto(id: string) {
    const gasto = await this.gastoRepository.findOne({
      where: { Id: id },
      relations: ['Presupuesto', 'Presupuesto.Fondo'],
    });
    if (!gasto) {
      throw new NotFoundException('No se encontro el presupuesto ');
    }
    const presupuesto = gasto.Presupuesto;
    const fondo = gasto.Presupuesto.Fondo;

    if (gasto.TipoDinero === 0) {
      presupuesto.Progreso =
        Number(presupuesto.Progreso) - Number(gasto.Dinero);
      fondo.Efectivo = Number(fondo.Efectivo) + Number(gasto.Dinero);
      fondo.Total = Number(fondo.Total) + Number(gasto.Dinero);
      await this.presupuestoRepository.save(presupuesto);
      await this.fondoRepository.save(fondo);
      return await this.ingresoRepository.remove(gasto);
    } else if (gasto.TipoDinero === 1) {
      presupuesto.Progreso =
        Number(presupuesto.Progreso) - Number(gasto.Dinero);
      fondo.Digital = Number(fondo.Digital) + Number(gasto.Dinero);
      fondo.Total = Number(fondo.Total) + Number(gasto.Dinero);
      await this.presupuestoRepository.save(presupuesto);
      await this.fondoRepository.save(fondo);
      return await this.ingresoRepository.remove(gasto);
    } else {
      throw new InternalServerErrorException('algo salio mal');
    }
  }
}
