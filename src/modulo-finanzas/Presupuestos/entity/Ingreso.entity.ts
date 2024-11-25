import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Presupuesto } from './Presupuesto.entity';
import { text } from 'stream/consumers';
import { ModuloFinanzas } from 'src/modulo-finanzas/ModuloFinanzas/entities/modulo-finanza.entity';

@Entity({ name: 'Ingresos' })
export class Ingreso {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @Column({ type: 'decimal' })
  Dinero: number;

  @Column({ type: 'text', nullable: true })
  Descripcion: string;

  @CreateDateColumn({ name: 'fecha_de_creacion', type: 'timestamp' })
  FechaDeCreacion: Date;

  @Column({ type: 'boolean', default: true })
  Estado: boolean;
  @ManyToOne(() => Presupuesto, (presupuesto) => presupuesto.Ingresos)
  Presupuesto: Presupuesto;
  @ManyToOne(
    () => ModuloFinanzas,
    (moduloFinanzas) => moduloFinanzas.Ingresos,
    { onDelete: 'CASCADE' },
  )
  ModuloFinanzas: ModuloFinanzas;
}
