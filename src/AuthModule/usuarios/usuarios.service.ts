import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.userRepository.create(createUsuarioDto);
    const correo = await this.userRepository.findOne({
      where: { Correo: createUsuarioDto.Correo },
    });
    if (correo) {
      throw new BadRequestException('Ya existe un usuario con ese correo');
    }
    usuario.Password = bcrypt.hashSync(usuario.Password, 10);
    usuario.State = true;
    await this.userRepository.save(usuario);
    return 'Se creo el usuario con exito';
  }

  async update(Id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.userRepository.findOne({ where: { Id } });
    if (!usuario) {
      throw new NotFoundException('El usuario No existe');
    }
    if (updateUsuarioDto.Correo && updateUsuarioDto.Correo !== usuario.Correo) {
      const correo = await this.userRepository.findOne({
        where: { Correo: updateUsuarioDto.Correo },
      });
      if (correo) {
        throw new BadRequestException('El correo ya existe');
      }
    }
    await this.userRepository.merge(usuario, updateUsuarioDto);
    if (updateUsuarioDto.Password) {
      usuario.Password = bcrypt.hashSync(usuario.Password, 10);
    }

    await this.userRepository.save(usuario);
    return 'Actualizado con exito';
  }
}
