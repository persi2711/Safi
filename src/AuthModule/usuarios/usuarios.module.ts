import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { Notificaciones } from './entities/Notificaciones.entity';
import { Cuenta } from 'src/cuentas/entities/cuenta.entity';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [
    TypeOrmModule.forFeature([Usuario, Notificaciones, Cuenta]),
    JwtModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class UsuariosModule {}
