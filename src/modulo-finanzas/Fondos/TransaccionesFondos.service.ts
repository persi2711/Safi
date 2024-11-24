import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransaccionFondo } from './dto/createTransaccionFondo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransaccionFondo } from './entity/TransaccionesFondos.entity';
import { Repository } from 'typeorm';
import { Fondo } from './entity/Fondos.entity';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { ModuloFinanzas } from '../ModuloFinanzas/entities/modulo-finanza.entity';
import { Cuenta } from 'src/cuentas/entities/Cuenta.entity';

@Injectable()
export class TransaccionesFondoService {
  constructor(
    @InjectRepository(TransaccionFondo)
    private transaccionesFondosRepository: Repository<TransaccionFondo>,
    @InjectRepository(Fondo)
    private fondoRepository: Repository<Fondo>,
    @InjectRepository(ModuloFinanzas)
    private moduloFinanzasRepository: Repository<ModuloFinanzas>,
    @InjectRepository(Cuenta)
    private cuentaRepository: Repository<Cuenta>,
  ) {}
  async create(createModuloFinanzaDto: CreateTransaccionFondo, user: Usuario) {
    const modulo = await this.moduloFinanzasRepository.findOne({
      where: { Id: createModuloFinanzaDto.ModuloFinanzasId },
    });
    if (!modulo) {
      throw new NotFoundException('No se encontro el modulo de finazas');
    }
    const fondo = await this.fondoRepository.findOne({
      where: { Id: createModuloFinanzaDto.FondoId, Estado: true },
    });
    if (!fondo) {
      throw new NotFoundException('no se encotnro el fondo');
    }
    const cuenta = await this.cuentaRepository.findOne({
      where: { Id: createModuloFinanzaDto.CuentaId, Estado: 1 },
    });
    if (!cuenta) {
      throw new NotFoundException('no se encontro la cuenta');
    }
    if (createModuloFinanzaDto.Tipo === 1) {
      if (cuenta.Dinero < createModuloFinanzaDto.Dinero) {
        throw new BadRequestException(
          'No hay sufciente dinero en la cuenta para realizar la operacion',
        );
      }
      if (cuenta.Tipo === 0) {
        cuenta.Dinero =
          Number(cuenta.Dinero) - Number(createModuloFinanzaDto.Dinero);
        fondo.Efectivo =
          Number(fondo.Efectivo) + Number(createModuloFinanzaDto.Dinero);
        fondo.Total =
          Number(fondo.Total) + Number(createModuloFinanzaDto.Dinero);
      } else if (cuenta.Tipo === 1) {
        cuenta.Dinero =
          Number(cuenta.Dinero) - Number(createModuloFinanzaDto.Dinero);
        fondo.Digital =
          Number(fondo.Digital) + Number(createModuloFinanzaDto.Dinero);
        fondo.Total =
          Number(fondo.Total) + Number(createModuloFinanzaDto.Dinero);
      } else {
        throw new BadRequestException('La cuenta es de un tipo desconconocido');
      }
    } else if (createModuloFinanzaDto.Tipo === 2) {
      if (cuenta.Tipo === 0) {
        if (fondo.Efectivo < createModuloFinanzaDto.Dinero) {
          throw new BadRequestException(
            'No hay suficientes fondos para realizar la operacion',
          );
        }
        cuenta.Dinero =
          Number(cuenta.Dinero) + Number(createModuloFinanzaDto.Dinero);
        fondo.Efectivo =
          Number(fondo.Efectivo) - Number(createModuloFinanzaDto.Dinero);
        fondo.Total =
          Number(fondo.Total) - Number(createModuloFinanzaDto.Dinero);
      } else if (cuenta.Tipo === 1) {
        if (fondo.Digital < createModuloFinanzaDto.Dinero) {
          throw new BadRequestException(
            'No hay suficientes fondos para realizar la operacion',
          );
        }
        cuenta.Dinero =
          Number(cuenta.Dinero) + Number(createModuloFinanzaDto.Dinero);
        fondo.Digital =
          Number(fondo.Digital) - Number(createModuloFinanzaDto.Dinero);
        fondo.Total =
          Number(fondo.Total) - Number(createModuloFinanzaDto.Dinero);
      } else {
        throw new BadRequestException('La cuenta es de un tipo desconconocido');
      }
    } else {
      throw new BadRequestException('El tipo de operacion es desconocido');
    }

    const transaccion = await this.transaccionesFondosRepository.create({
      Dinero: createModuloFinanzaDto.Dinero,
      Fecha: Date(),
      Fondo: fondo,
      Cuenta: cuenta,
      moduloFinanzas: modulo,
      usuario: user,
      Tipo: createModuloFinanzaDto.Tipo,
    });
    if (!transaccion) {
      throw new InternalServerErrorException(
        'no se pudo crear el registro de transaccion',
      );
    }
    await this.fondoRepository.save(fondo);
    await this.cuentaRepository.save(cuenta);
    return await this.transaccionesFondosRepository.save(transaccion);
  }
  async findAllByUser(user: Usuario) {
    return await this.transaccionesFondosRepository.find({
      where: { usuario: user },
    });
  }
  async findAllByFondo(id: string) {
    const fondo = await this.fondoRepository.findOne({
      where: { Id: id, Estado: true },
    });
    if (!fondo) {
      throw new NotFoundException('no se encontron el fondo');
    }
    return await this.transaccionesFondosRepository.find({
      where: { Fondo: fondo },
    });
  }

  async findAllByCuenta(id: string) {
    const cuenta = await this.cuentaRepository.findOne({
      where: { Id: id, Estado: 1 },
    });
    if (!cuenta) {
      throw new NotFoundException('no se encontron el fondo');
    }
    return await this.transaccionesFondosRepository.find({
      where: { Cuenta: cuenta },
    });
  }
  async findAllByModule(id: string) {
    const modulo = await this.moduloFinanzasRepository.findOne({
      where: { Id: id, Estado: true },
    });
    if (!modulo) {
      throw new NotFoundException('no se encontron el fondo');
    }
    return await this.transaccionesFondosRepository.find({
      where: { moduloFinanzas: modulo },
    });
  }

  async findOne(id: string) {
    const transaccion = await this.transaccionesFondosRepository.findOne({
      where: { Id: id },
    });
    if (!transaccion) {
      throw new NotFoundException('no se encontro la transaccion');
    }
    return transaccion;
  }
}
