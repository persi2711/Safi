import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Fondo } from './Fondos.entity';
import { Cuenta } from 'src/cuentas/entities/cuenta.entity';

@Entity({ name: 'TransaccionesFondos' })
export class TransaccionFondo {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  Dinero: number;

  @CreateDateColumn({ name: 'fecha', type: 'timestamp' })
  Fecha: Date;
  @ManyToOne(() => Fondo, (fondo) => fondo.TransaccionesFondos)
  Fondo: Fondo;
  @ManyToOne(() => Cuenta, (cuenta) => cuenta.TransaccionesFondos)
  Cuenta: Cuenta;
}
