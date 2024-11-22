import { Module } from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { CuentasController } from './cuentas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from './entities/Cuenta.entity';
import { MovimientoCuenta } from './entities/MoviminetoCuentas.entity';
import { AuthModule } from 'src/AuthModule/auth/auth.module';
import { TransferController } from './Transfer.controller';

@Module({
  controllers: [CuentasController, TransferController],
  providers: [CuentasService],
  imports: [TypeOrmModule.forFeature([Cuenta, MovimientoCuenta]), AuthModule],
  exports: [TypeOrmModule],
})
export class CuentasModule {}
