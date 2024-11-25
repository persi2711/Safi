import { Evento } from 'src/modulo-finanzas/Eventos/Entity/Evento.entity';
import { Fondo } from 'src/modulo-finanzas/Fondos/entity/Fondos.entity';
import { TransaccionFondo } from 'src/modulo-finanzas/Fondos/entity/TransaccionesFondos.entity';
import { TransFondo } from 'src/modulo-finanzas/Fondos/entity/TransFondos.entity';
import { Gasto } from 'src/modulo-finanzas/Presupuestos/entity/Gasto.entity';
import { Ingreso } from 'src/modulo-finanzas/Presupuestos/entity/Ingreso.entity';
import { Presupuesto } from 'src/modulo-finanzas/Presupuestos/entity/Presupuesto.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'ModuloFinanzas' })
export class ModuloFinanzas {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @CreateDateColumn({ name: 'fecha_de_creacion', type: 'timestamp' })
  FechaDeCreacion: Date;

  @Column({ type: 'boolean', default: true })
  Estado: boolean;
  @OneToOne(() => Proyecto, (proyecto) => proyecto.ModuloFinanzas)
  Proyecto: Proyecto;
  @OneToMany(() => Presupuesto, (presupuesto) => presupuesto.ModuloFinanzas)
  Presupuestos: Presupuesto[];
  @OneToMany(() => Evento, (evento) => evento.ModuloFinanzas)
  Eventos: Evento[];
  @OneToMany(() => Fondo, (fondo) => fondo.ModuloFinanzas)
  Fondos: Fondo[];
  @OneToMany(
    () => TransaccionFondo,
    (transaccionFondo) => transaccionFondo.moduloFinanzas,
  )
  transacciones: TransaccionFondo[];
  @OneToMany(() => TransFondo, (transFondo) => transFondo.moduloFinanzas, {
    cascade: true,
  })
  transFondo: TransFondo[];
  @OneToMany(() => Gasto, (gasto) => gasto.ModuloFinanzas)
  Gastos: Gasto[];
  @OneToMany(() => Ingreso, (ingreso) => ingreso.ModuloFinanzas)
  Ingresos: Ingreso[];
}
