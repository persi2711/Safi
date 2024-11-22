import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cuenta } from './Cuenta.entity';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';

@Entity({ name: 'MovimientosCuentas' })
export class MovimientoCuenta {
  @PrimaryGeneratedColumn('uuid')
  Id: string; // UUID como clave primaria

  @Column({ type: 'decimal' })
  Dinero: number;

  @CreateDateColumn({ name: 'fecha', type: 'timestamp' })
  Fecha: Date;
  @ManyToOne(() => Cuenta, (cuenta) => cuenta.MovimientosEnviados)
  @JoinColumn({ name: 'id_envia' })
  CuentaEnvia: Cuenta;

  @ManyToOne(() => Cuenta, (cuenta) => cuenta.MovimientosRecibidos)
  @JoinColumn({ name: 'id_recibe' })
  CuentaRecibe: Cuenta;

  @ManyToOne(() => Usuario, (usuario) => usuario.movimientos, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
