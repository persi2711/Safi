import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Presupuesto } from './Presupuesto.entity';

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

  @Column({ type: 'boolean', default: true })
  Estado: boolean;
  @ManyToOne(() => Presupuesto, (presupuesto) => presupuesto.Gastos)
  Presupuesto: Presupuesto;
}
