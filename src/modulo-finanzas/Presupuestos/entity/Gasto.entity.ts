import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Presupuesto } from './Presupuesto.entity';
import { ModuloFinanzas } from 'src/modulo-finanzas/ModuloFinanzas/entities/modulo-finanza.entity';

@Entity({ name: 'Gastos' })
export class Gasto {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @Column({ type: 'decimal' })
  Dinero: number;

  @Column({ type: 'text', nullable: true })
  Descripcion: string;

  @CreateDateColumn({ name: 'fecha_de_creacion', type: 'timestamp' })
  FechaDeCreacion: Date;
  @Column({ type: 'int' })
  TipoDinero: number;
  @Column({ type: 'boolean', default: true })
  Estado: boolean;
  @ManyToOne(() => Presupuesto, (presupuesto) => presupuesto.Gastos)
  Presupuesto: Presupuesto;
  @ManyToOne(() => ModuloFinanzas, (moduloFinanzas) => moduloFinanzas.Gastos, {
    onDelete: 'CASCADE',
  })
  ModuloFinanzas: ModuloFinanzas;
}
