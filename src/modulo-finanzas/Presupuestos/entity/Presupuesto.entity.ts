import { ModuloFinanzas } from 'src/modulo-finanzas/ModuloFinanzas/entities/modulo-finanza.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Ingreso } from './Ingreso.entity';
import { Gasto } from './gasto.enitity';

@Entity({ name: 'Presupuestos' })
export class Presupuesto {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @Column({ type: 'int' })
  Estado: number;
  @ManyToOne(
    () => ModuloFinanzas,
    (moduloFinanzas) => moduloFinanzas.Presupuestos,
  )
  ModuloFinanzas: ModuloFinanzas;

  @OneToMany(() => Ingreso, (ingreso) => ingreso.Presupuesto)
  Ingresos: Ingreso[];
  @OneToMany(() => Gasto, (gasto) => gasto.Presupuesto)
  Gastos: Gasto[];
}
