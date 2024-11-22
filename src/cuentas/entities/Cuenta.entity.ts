import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MovimientoCuenta } from './MoviminetoCuentas.entity';
import { TransaccionFondo } from 'src/modulo-finanzas/Fondos/entity/TransaccionesFondos.entity';

@Entity({ name: 'Cuentas' })
export class Cuenta {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @Column({ type: 'decimal' })
  Dinero: number;

  @Column({ type: 'int' })
  Tipo: number;

  @Column({ type: 'int' })
  Estado: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.Cuentas)
  Usuario: Usuario;
  @OneToMany(() => MovimientoCuenta, (movimiento) => movimiento.CuentaEnvia)
  MovimientosEnviados: MovimientoCuenta[];

  @OneToMany(() => MovimientoCuenta, (movimiento) => movimiento.CuentaRecibe)
  MovimientosRecibidos: MovimientoCuenta[];
  @OneToMany(
    () => TransaccionFondo,
    (transaccionFondo) => transaccionFondo.Cuenta,
  )
  TransaccionesFondos: TransaccionFondo[];
}
