import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuenta } from './entities/Cuenta.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { repeat } from 'rxjs';
import { RenameCuentaDto } from './dto/rename-cuenta.dto';
import { TransferCuentaDto } from './dto/Transfer-cuenta.dto';

@Injectable()
export class CuentasService {
  constructor(
    @InjectRepository(Cuenta)
    private CuentaRepository: Repository<Cuenta>,
  ) {}

  async create(createCuentaDto: CreateCuentaDto, user: Usuario) {
    const repeat = await this.CuentaRepository.findOne({
      where: { Nombre: createCuentaDto.Nombre, Estado: 1 },
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

  async findAll(user: Usuario) {
    return await this.CuentaRepository.find({
      where: { Estado: 1, Usuario: user },
    });
  }

  async findOne(id: string) {
    return await this.CuentaRepository.findOne({
      where: { Estado: 1, Id: id },
    });
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

  async Transfer(tranfercunetaDto: TransferCuentaDto, user: Usuario) {}
}
