import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsString, IsInt, IsUUID } from 'class-validator';
import { Evento } from 'src/modulo-finanzas/Eventos/Enitity/Evento.entity';
@Entity({ name: 'Tareas' }) // Nombre de la tabla en la base de datos
export class Tarea {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  nombre: string;

  @CreateDateColumn({ type: 'timestamptz' })
  fechaCreacion: Date;

  @Column({ type: 'timestamptz', nullable: true })
  fechaFinalizacion: Date;

  @Column({ type: 'int' })
  @IsInt()
  estado: number;

  @OneToMany(() => Evento, (evento) => evento.tarea, { cascade: true })
  eventos: Evento[];
}
