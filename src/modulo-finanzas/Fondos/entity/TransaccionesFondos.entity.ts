import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Fondo } from './Fondos.entity';
import { Cuenta } from 'src/cuentas/entities/Cuenta.entity';
import { ModuloFinanzas } from 'src/modulo-finanzas/ModuloFinanzas/entities/modulo-finanza.entity';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';

@Entity({ name: 'TransaccionesFondos' })
export class TransaccionFondo {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @Column({ type: 'decimal' })
  Dinero: number;

  @Column({ type: 'int' })
  Tipo: number;

  @CreateDateColumn({ name: 'fecha', type: 'timestamp' })
  Fecha: Date;
  @ManyToOne(() => Fondo, (fondo) => fondo.TransaccionesFondos)
  Fondo: Fondo;
  @ManyToOne(() => Cuenta, (cuenta) => cuenta.TransaccionesFondos)
  Cuenta: Cuenta;
  @ManyToOne(
    () => ModuloFinanzas,
    (moduloFinanzas) => moduloFinanzas.transacciones,
  )
  moduloFinanzas: ModuloFinanzas;
  @ManyToOne(() => Usuario, (usuario) => usuario.transacciones, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
