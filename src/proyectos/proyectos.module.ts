import { Module } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { AuthModule } from 'src/AuthModule/auth/auth.module';
import { ModuloFinanzas } from 'src/modulo-finanzas/ModuloFinanzas/entities/modulo-finanza.entity';
import { Fondo } from 'src/modulo-finanzas/Fondos/entity/Fondos.entity';

@Module({
  controllers: [ProyectosController],
  providers: [ProyectosService],
  imports: [
    TypeOrmModule.forFeature([Proyecto, ModuloFinanzas, Fondo]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class ProyectosModule {}
