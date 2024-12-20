import { Optional } from '@nestjs/common';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Notificaciones } from './Notificaciones.entity';

import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import { Cuenta } from 'src/cuentas/entities/Cuenta.entity';
import { MovimientoCuenta } from 'src/cuentas/entities/MoviminetoCuentas.entity';
import { TransaccionFondo } from 'src/modulo-finanzas/Fondos/entity/TransaccionesFondos.entity';

@Entity({ name: 'Usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('text')
  Nombre: string;
  @Column('text')
  Apellido: string;
  @Column('text', { unique: true })
  Correo: string;
  @Column('text', { select: false })
  Password: string;
  @Column('text', { nullable: true })
  ImageURL: string;
  @Column('text', { nullable: true })
  Token: string | null;
  @Column('bool')
  State: boolean;
  @OneToMany(() => Notificaciones, (notificacion) => notificacion.Usuario)
  Notificaciones: Notificaciones[];
  @OneToMany(() => Cuenta, (cuenta) => cuenta.Usuario)
  Cuentas: Cuenta[];
  @OneToMany(() => Proyecto, (proyecto) => proyecto.Usuario)
  Proyectos: Proyecto[];

  @OneToMany(
    () => MovimientoCuenta,
    (movimientoCuenta) => movimientoCuenta.usuario,
    { cascade: true },
  )
  movimientos: MovimientoCuenta[];
  @OneToMany(
    () => TransaccionFondo,
    (transaccionFondo) => transaccionFondo.usuario,
  )
  transacciones: TransaccionFondo[];
}
