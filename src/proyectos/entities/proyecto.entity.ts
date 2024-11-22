import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { ModuloFinanzas } from 'src/modulo-finanzas/ModuloFinanzas/entities/modulo-finanza.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'Proyectos' })
export class Proyecto {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @Column({ type: 'int' })
  Estado: number;

  @CreateDateColumn({ name: 'fecha_de_creacion', type: 'timestamp' })
  FechaDeCreacion: Date;
  @ManyToOne(() => Usuario, (usuario) => usuario.Proyectos)
  Usuario: Usuario;
  @OneToOne(() => ModuloFinanzas)
  @JoinColumn()
  ModuloFinanzas: ModuloFinanzas;
}
