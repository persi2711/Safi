import { Module } from '@nestjs/common';
import { ModuloFinanzasService } from './modulo-finanzas.service';
import { ModuloFinanzasController } from './modulo-finanzas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './Eventos/Entity/Evento.entity';
import { Fondo } from './Fondos/entity/Fondos.entity';
import { Presupuesto } from './Presupuestos/entity/Presupuesto.entity';

import { Ingreso } from './Presupuestos/entity/Ingreso.entity';
import { TransaccionFondo } from './Fondos/entity/TransaccionesFondos.entity';
import { ModuloFinanzas } from './ModuloFinanzas/entities/modulo-finanza.entity';
import { Tarea } from './Tareas/entity/Tarea.entity';
import { Gasto } from './Presupuestos/entity/Gasto.entity';
import { AuthModule } from 'src/AuthModule/auth/auth.module';
import { FondosController } from './Fondos/Fondos.controller';
import { FondoService } from './Fondos/Fondos.service';
import { TransaccionesFondosController } from './Fondos/TransaccionesFondos.controller';
import { TransaccionesFondoService } from './Fondos/TransaccionesFondos.service';
import { TransFondo } from './Fondos/entity/TransFondos.entity';
import { TransFondoController } from './Fondos/TransFondo.controller';
import { TransFondoService } from './Fondos/TransFondo.service';
import { PresupuestoController } from './Presupuestos/Presupuestos.controller';
import { PresupuestoService } from './Presupuestos/Presupuestos.service';
import { TransaccionesController } from './Presupuestos/Transacciones.controller';
import { TransaccionesService } from './Presupuestos/Transacciones.service';

@Module({
  controllers: [
    FondosController,
    TransaccionesFondosController,
    TransFondoController,
    PresupuestoController,
    TransaccionesController,
  ],
  providers: [
    FondoService,
    TransaccionesFondoService,
    TransFondoService,
    PresupuestoService,
    TransaccionesService,
  ],
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
      TransFondo,
    ]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class ModuloFinanzasModule {}
