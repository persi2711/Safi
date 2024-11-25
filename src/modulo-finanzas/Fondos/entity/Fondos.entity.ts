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
import { TransFondo } from './TransFondos.entity';
import { Presupuesto } from 'src/modulo-finanzas/Presupuestos/entity/Presupuesto.entity';

@Entity({ name: 'Fondos' })
export class Fondo {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @CreateDateColumn({ name: 'fecha_de_creacion', type: 'timestamp' })
  FechaDeCreacion: Date;

  @Column({ type: 'decimal' })
  Efectivo: number;

  @Column({ type: 'decimal' })
  Digital: number;

  @Column({ type: 'decimal' })
  Total: number;

  @Column({ type: 'int' })
  Tipo: number;

  @Column({ type: 'boolean', default: true })
  Estado: boolean;
  @ManyToOne(() => ModuloFinanzas, (moduloFinanzas) => moduloFinanzas.Fondos)
  ModuloFinanzas: ModuloFinanzas;

  @OneToMany(
    () => TransaccionFondo,
    (transaccionFondo) => transaccionFondo.Fondo,
  )
  TransaccionesFondos: TransaccionFondo[];
  @OneToMany(() => TransFondo, (transFondo) => transFondo.FondoEnviado)
  TransEnviado: TransFondo[];

  @OneToMany(() => TransFondo, (transFondo) => transFondo.FondoRecibe)
  TransRecibido: TransFondo[];
  @OneToMany(() => Presupuesto, (presupuesto) => presupuesto.Fondo)
  Presupuestos: Presupuesto[];
}
