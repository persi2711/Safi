import { ModuloFinanzas } from 'src/modulo-finanzas/ModuloFinanzas/entities/modulo-finanza.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TransaccionFondo } from './TransaccionesFondos.entity';

@Entity({ name: 'Fondos' })
export class Fondo {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @CreateDateColumn({ name: 'fecha_de_creacion', type: 'timestamp' })
  FechaDeCreacion: Date;

  @Column({ type: 'decimal' })
  Dinero: number;

  @Column({ type: 'boolean', default: true })
  Estado: boolean;
  @ManyToOne(() => ModuloFinanzas, (moduloFinanzas) => moduloFinanzas.Fondos)
  ModuloFinanzas: ModuloFinanzas;
  @OneToMany(
    () => TransaccionFondo,
    (transaccionFondo) => transaccionFondo.Fondo,
  )
  TransaccionesFondos: TransaccionFondo[];
}
