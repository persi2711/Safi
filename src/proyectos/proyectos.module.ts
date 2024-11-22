import { Module } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';

@Module({
  controllers: [ProyectosController],
  providers: [ProyectosService],
  imports: [TypeOrmModule.forFeature([Proyecto])],
  exports: [TypeOrmModule],
})
export class ProyectosModule {}
