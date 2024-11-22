import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity({ name: 'Notificaciones' })
export class Notificaciones {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @Column({ type: 'int' })
  Tipo: number;

  @Column({ type: 'boolean', default: true })
  Estado: boolean;

  @CreateDateColumn({ name: 'fecha_de_creacion', type: 'timestamp' })
  FechaDeCreacion: Date;
  @ManyToOne(() => Usuario, (usuario) => usuario.Notificaciones)
  Usuario: Usuario;
}
