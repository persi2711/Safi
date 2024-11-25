import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuenta } from './entities/Cuenta.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';

import { RenameCuentaDto } from './dto/rename-cuenta.dto';
import { TransferCuentaDto } from './dto/Transfer-cuenta.dto';
import { MovimientoCuenta } from './entities/MoviminetoCuentas.entity';

@Injectable()
export class CuentasService {
  constructor(
    @InjectRepository(Cuenta)
    private CuentaRepository: Repository<Cuenta>,
    @InjectRepository(MovimientoCuenta)
    private MovimientoCuentaRepository: Repository<MovimientoCuenta>,
  ) {}

  async create(createCuentaDto: CreateCuentaDto, user: Usuario) {
    const repeat = await this.CuentaRepository.findOne({
      where: { Nombre: createCuentaDto.Nombre, Estado: 1, Usuario: user },
    });
    if (repeat) {
      throw new BadRequestException('Ya existe una cuenta con ese nombre');
    }

    const cuenta = await this.CuentaRepository.create(createCuentaDto);
    cuenta.Usuario = user;
    cuenta.Estado = 1;
    await this.CuentaRepository.save(cuenta);
    return cuenta;
  }

  async findAllEfectivo(user: Usuario) {
    return await this.CuentaRepository.find({
      where: { Estado: 1, Usuario: user, Tipo: 0 },
    });
  }
  async findAll(user: Usuario) {
    return await this.CuentaRepository.find({
      where: { Estado: 1, Usuario: user },
    });
  }
  async findAllBanco(user: Usuario) {
    return await this.CuentaRepository.find({
      where: { Estado: 1, Usuario: user, Tipo: 1 },
    });
  }

  async findOne(id: string) {
    const cuenta = await this.CuentaRepository.findOne({
      where: { Estado: 1, Id: id },
    });
    if (!cuenta) {
      throw new NotFoundException('No se encontro la cuenta');
    }
    return cuenta;
  }

  async update(id: string, updateCuentaDto: UpdateCuentaDto) {
    const cuenta = await this.CuentaRepository.findOne({ where: { Id: id } });

    if (!cuenta) {
      throw new NotFoundException('La cuenta no se encotro');
    }
    if (cuenta.Estado === 0) {
      throw new BadRequestException('La cuenta esta inactiva');
    }
    const repeat = await this.CuentaRepository.findOne({
      where: { Nombre: updateCuentaDto.Nombre, Estado: 1 },
    });
    if (repeat) {
      console.log(repeat);
      if (repeat.Id !== id) {
        throw new BadRequestException('El nombre de la cuenta ya existe');
      }
    }

    await this.CuentaRepository.merge(cuenta, updateCuentaDto);

    await this.CuentaRepository.save(cuenta);
    return cuenta;
  }

  async remove(id: string) {
    const cuenta = await this.CuentaRepository.findOne({ where: { Id: id } });
    if (cuenta.Dinero > 0) {
      throw new BadRequestException(
        'La cuenta debe estar en cero para ser eliminada',
      );
    }
    cuenta.Estado = 0;
    this.CuentaRepository.save(cuenta);
    return cuenta;
  }
  async rename(id: string, renameCuentaDto: RenameCuentaDto) {
    const cuenta = await this.CuentaRepository.findOne({ where: { Id: id } });

    if (!cuenta) {
      throw new NotFoundException('La cuenta no se encotro');
    }
    if (cuenta.Estado === 0) {
      throw new BadRequestException('La cuenta esta inactiva');
    }
    const repeat = await this.CuentaRepository.findOne({
      where: { Nombre: renameCuentaDto.Nombre, Estado: 1 },
    });
    if (repeat) {
      console.log(repeat);
      if (repeat.Id !== id) {
        throw new BadRequestException('El nombre de la cuenta ya existe');
      }
    }

    cuenta.Nombre = renameCuentaDto.Nombre;

    await this.CuentaRepository.save(cuenta);
    return cuenta;
  }

  async Transfer(tranfercunetaDto: TransferCuentaDto, user: Usuario) {
    const cuentaEnvia = await this.CuentaRepository.findOne({
      where: { Id: tranfercunetaDto.CuentaEnvia, Estado: 1 },
    });
    if (!cuentaEnvia) {
      throw new BadRequestException('La cuenta que envia no existe');
    }
    if (cuentaEnvia.Dinero < tranfercunetaDto.Dinero) {
      throw new BadRequestException('la cuenta no tiene suficientes fondos');
    }
    const cuentaRecibe = await this.CuentaRepository.findOne({
      where: { Id: tranfercunetaDto.CuentaRecibe, Estado: 1 },
    });
    if (!cuentaRecibe) {
      throw new BadRequestException('La cuenta que envia no existe');
    }
    cuentaEnvia.Dinero =
      Number(cuentaEnvia.Dinero) - Number(tranfercunetaDto.Dinero);
    cuentaRecibe.Dinero =
      Number(cuentaRecibe.Dinero) + Number(tranfercunetaDto.Dinero);

    const movimientoCuenta = await this.MovimientoCuentaRepository.create({
      Dinero: tranfercunetaDto.Dinero,
      Fecha: Date(),
      CuentaEnvia: cuentaEnvia,
      CuentaRecibe: cuentaRecibe,
      usuario: user,
    });
    if (!movimientoCuenta) {
      throw new InternalServerErrorException(
        'no se pudo generar el registro de tranferencia',
      );
    }
    await this.CuentaRepository.save(cuentaEnvia);
    await this.CuentaRepository.save(cuentaRecibe);
    await this.MovimientoCuentaRepository.save(movimientoCuenta);
    return movimientoCuenta;
  }
  async findAllTransfers(user: Usuario) {
    const transferencias = await this.MovimientoCuentaRepository.find({
      where: { usuario: user },
      relations: ['CuentaRecibe', 'CuentaEnvia'],
    });
    return transferencias;
  }
  async findOneTransfer(id: string) {
    const transferencia = await this.MovimientoCuentaRepository.findOne({
      where: { Id: id },
      relations: ['CuentaRecibe', 'CuentaEnvia'],
    });
    if (!transferencia) {
      throw new NotFoundException('No se encontro la tarsnferencia');
    }
    return transferencia;
  }
  async findByCuenta(id: string) {
    const cuenta = await this.CuentaRepository.findOne({ where: { Id: id } });
    if (!cuenta) {
      throw new NotFoundException('No se encontro la cuenta');
    }
    const transferencias1 = await this.MovimientoCuentaRepository.find({
      where: { CuentaEnvia: cuenta },
      relations: ['CuentaRecibe', 'CuentaEnvia'],
    });
    const transferencias2 = await this.MovimientoCuentaRepository.find({
      where: { CuentaRecibe: cuenta },
      relations: ['CuentaRecibe', 'CuentaEnvia'],
    });
    const transferencias = transferencias1.concat(transferencias2);
    return transferencias.sort((a, b) => b.Fecha.getTime() - a.Fecha.getTime());
  }
}
