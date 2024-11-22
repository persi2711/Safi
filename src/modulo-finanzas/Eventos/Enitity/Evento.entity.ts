import { ModuloFinanzas } from 'src/modulo-finanzas/ModuloFinanzas/entities/modulo-finanza.entity';
import { Tarea } from 'src/modulo-finanzas/Tareas/entity/Tarea.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'Eventos' })
export class Evento {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @CreateDateColumn({ name: 'fecha_de_creacion', type: 'timestamp' })
  FechaDeCreacion: Date;

  @Column({ name: 'fecha_de_ejecucion', type: 'timestamp' })
  FechaDeEjecucion: Date;

  @Column({ type: 'int' })
  Tipo: number;

  @Column({ type: 'int' })
  Estado: number;
  @ManyToOne(() => ModuloFinanzas, (moduloFinanzas) => moduloFinanzas.Eventos)
  ModuloFinanzas: ModuloFinanzas;
  @ManyToOne(() => Tarea, (tarea) => tarea.eventos, { onDelete: 'CASCADE' })
  tarea: Tarea;
}
