import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Fondo } from './Fondos.entity';
import { ModuloFinanzas } from 'src/modulo-finanzas/ModuloFinanzas/entities/modulo-finanza.entity';

@Entity({ name: 'TransFondos' })
export class TransFondo {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @Column({ type: 'decimal' })
  Dinero: number;

  @CreateDateColumn({ name: 'fecha', type: 'timestamp' })
  Fecha: Date;

  @Column({ type: 'int' })
  Tipo: number;
  @ManyToOne(
    () => ModuloFinanzas,
    (moduloFinanzas) => moduloFinanzas.transFondo,
    {
      onDelete: 'CASCADE',
    },
  )
  moduloFinanzas: ModuloFinanzas;
  @ManyToOne(() => Fondo, (fondo) => fondo.TransEnviado)
  @JoinColumn({ name: 'id_envia' })
  FondoEnviado: Fondo;

  @ManyToOne(() => Fondo, (fondo) => fondo.TransRecibido)
  @JoinColumn({ name: 'id_recibe' })
  FondoRecibe: Fondo;
}
