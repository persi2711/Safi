import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Presupuesto } from './Presupuesto.entity';
import { text } from 'stream/consumers';

@Entity({ name: 'Ingresos' })
export class Ingreso {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  Dinero: number;

  @Column({ type: 'text', nullable: true })
  Descripcion: string;

  @CreateDateColumn({ name: 'fecha_de_creacion', type: 'timestamp' })
  FechaDeCreacion: Date;

  @Column({ type: 'boolean', default: true })
  Estado: boolean;
  @ManyToOne(() => Presupuesto, (presupuesto) => presupuesto.Ingresos)
  Presupuesto: Presupuesto;
}
