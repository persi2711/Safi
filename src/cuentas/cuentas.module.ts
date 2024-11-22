import { Module } from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { CuentasController } from './cuentas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from './entities/cuenta.entity';
import { MovimientoCuenta } from './entities/MoviminetoCuentas.entity';
import { AuthModule } from 'src/AuthModule/auth/auth.module';

@Module({
  controllers: [CuentasController],
  providers: [CuentasService],
  imports: [TypeOrmModule.forFeature([Cuenta, MovimientoCuenta]), AuthModule],
  exports: [TypeOrmModule],
})
export class CuentasModule {}
