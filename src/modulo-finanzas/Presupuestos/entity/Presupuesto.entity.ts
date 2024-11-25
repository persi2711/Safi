import { ModuloFinanzas } from 'src/modulo-finanzas/ModuloFinanzas/entities/modulo-finanza.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Ingreso } from './Ingreso.entity';
import { Gasto } from './Gasto.entity';
import { Fondo } from 'src/modulo-finanzas/Fondos/entity/Fondos.entity';

@Entity({ name: 'Presupuestos' })
export class Presupuesto {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @Column({ type: 'text', nullable: true })
  Descripcion: string | null;

  @Column({ type: 'decimal' })
  Presupuesto: number;

  @Column({ type: 'decimal' })
  Progreso: number;

  @CreateDateColumn({ name: 'fecha_de_creacion', type: 'timestamp' })
  FechaDeCreacion: Date;
  @Column({ type: 'int' })
  TipoPresupuesto: number;
  @Column({ type: 'int' })
  TipoTransaccion: number;

  @Column({ type: 'int' })
  Estado: number;
  @ManyToOne(
    () => ModuloFinanzas,
    (moduloFinanzas) => moduloFinanzas.Presupuestos,
  )
  ModuloFinanzas: ModuloFinanzas;

  @OneToMany(() => Ingreso, (ingreso) => ingreso.Presupuesto)
  Ingresos: Ingreso[];
  @OneToMany(() => Gasto, (gasto) => gasto.Presupuesto)
  Gastos: Gasto[];
  @ManyToOne(() => Fondo, (fondo) => fondo.Presupuestos, {
    onDelete: 'CASCADE',
  })
  Fondo: Fondo;
}
