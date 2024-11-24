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
import { CreateTransFondo } from './dto/createTransFondo.dto';
import { TransFondo } from './entity/TransFondos.entity';

@Injectable()
export class TransFondoService {
  constructor(
    @InjectRepository(TransFondo)
    private transFondosRepository: Repository<TransFondo>,
    @InjectRepository(Fondo)
    private fondoRepository: Repository<Fondo>,
    @InjectRepository(ModuloFinanzas)
    private moduloFinanzasRepository: Repository<ModuloFinanzas>,
  ) {}
  async create(cretaTransFondo: CreateTransFondo, user: Usuario) {
    const modulo = await this.moduloFinanzasRepository.findOne({
      where: { Id: cretaTransFondo.ModuloFinanzasId },
    });
    if (!modulo) {
      throw new NotFoundException('No se encontro el modulo de finazas');
    }
    const fondoEnvia = await this.fondoRepository.findOne({
      where: { Id: cretaTransFondo.FondoEnvia },
    });
    if (!fondoEnvia || fondoEnvia.Tipo === 3) {
      throw new NotFoundException('No se puedo encontrar el fondo que enviar');
    }

    const fondoRecibe = await this.fondoRepository.findOne({
      where: { Id: cretaTransFondo.FondoRecibe },
    });
    if (!fondoRecibe || fondoRecibe.Tipo === 3) {
      throw new NotFoundException('No se puedo encontrar el fondo que recibe');
    }

    if (cretaTransFondo.Tipo === 0) {
      if (fondoEnvia.Efectivo < cretaTransFondo.Dinero) {
        throw new BadRequestException(
          'El fondo no tiene suficiente dinero para realizar la operacion',
        );
      }
      fondoEnvia.Efectivo =
        Number(fondoEnvia.Efectivo) - Number(cretaTransFondo.Dinero);
      fondoEnvia.Total =
        Number(fondoEnvia.Total) - Number(cretaTransFondo.Dinero);
      fondoRecibe.Efectivo =
        Number(fondoRecibe.Efectivo) + Number(cretaTransFondo.Dinero);
      fondoRecibe.Total =
        Number(fondoRecibe.Total) + Number(cretaTransFondo.Dinero);
    } else if (cretaTransFondo.Tipo === 1) {
      if (fondoEnvia.Digital < cretaTransFondo.Dinero) {
        throw new BadRequestException(
          'El fondo no tiene suficiente dinero para realizar la operacion',
        );
      }
      fondoEnvia.Digital =
        Number(fondoEnvia.Digital) - Number(cretaTransFondo.Dinero);
      fondoEnvia.Total =
        Number(fondoEnvia.Total) - Number(cretaTransFondo.Dinero);
      fondoRecibe.Digital =
        Number(fondoRecibe.Digital) + Number(cretaTransFondo.Dinero);
      fondoRecibe.Total =
        Number(fondoRecibe.Total) + Number(cretaTransFondo.Dinero);
    } else {
      throw new BadRequestException('El tipo de tranferencia es desconocido');
    }
    const transfondo = await this.transFondosRepository.create({
      Dinero: cretaTransFondo.Dinero,
      Fecha: Date(),
      moduloFinanzas: modulo,
      FondoEnviado: fondoEnvia,
      FondoRecibe: fondoRecibe,
      Tipo: cretaTransFondo.Tipo,
    });
    if (!transfondo) {
      throw new InternalServerErrorException(
        'No se pudo crear la Transferencia',
      );
    }

    await this.fondoRepository.save(fondoEnvia);
    await this.fondoRepository.save(fondoRecibe);
    return await this.transFondosRepository.save(transfondo);
  }

  async findAllByFondo(id: string) {
    const fondo = await this.fondoRepository.findOne({
      where: { Id: id, Estado: true },
    });
    if (!fondo) {
      throw new NotFoundException('no se encontron el fondo');
    }
    const fondoenvia = await this.transFondosRepository.find({
      where: { FondoEnviado: fondo },
    });
    const fondorecibe = await this.transFondosRepository.find({
      where: { FondoRecibe: fondo },
    });

    const transfondo = fondoenvia.concat(fondorecibe);

    return transfondo.sort((a, b) => b.Fecha.getTime() - a.Fecha.getTime());
  }

  async findAllByModule(id: string) {
    const modulo = await this.moduloFinanzasRepository.findOne({
      where: { Id: id, Estado: true },
    });
    if (!modulo) {
      throw new NotFoundException('no se encontron el fondo');
    }
    return await this.transFondosRepository.find({
      where: { moduloFinanzas: modulo },
    });
  }

  async findOne(id: string) {
    const transaccion = await this.transFondosRepository.findOne({
      where: { Id: id },
    });
    if (!transaccion) {
      throw new NotFoundException('no se encontro la transaccion');
    }
    return transaccion;
  }
}
