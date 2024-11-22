import { Module } from '@nestjs/common';
import { ModuloFinanzasService } from './modulo-finanzas.service';
import { ModuloFinanzasController } from './modulo-finanzas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './Eventos/Enitity/Evento.entity';
import { Fondo } from './Fondos/entity/Fondos.entity';
import { Presupuesto } from './Presupuestos/entity/Presupuesto.entity';

import { Ingreso } from './Presupuestos/entity/Ingreso.entity';
import { TransaccionFondo } from './Fondos/entity/TransaccionesFondos.entity';
import { ModuloFinanzas } from './ModuloFinanzas/entities/modulo-finanza.entity';
import { Tarea } from './Tareas/entity/Tarea.entity';
import { Gasto } from './Presupuestos/entity/gasto.enitity';

@Module({
  controllers: [ModuloFinanzasController],
  providers: [ModuloFinanzasService],
  imports: [
    TypeOrmModule.forFeature([
      Evento,
      Fondo,
      Presupuesto,
      Gasto,
      Ingreso,
      TransaccionFondo,
      ModuloFinanzas,
      Tarea,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class ModuloFinanzasModule {}
