import { PartialType } from '@nestjs/mapped-types';
import { CreateModuloFinanzaDto } from './create-modulo-finanza.dto';

export class UpdateModuloFinanzaDto extends PartialType(CreateModuloFinanzaDto) {}
