import { PartialType } from '@nestjs/swagger';

import { CreateFondoDto } from './createFonodo.dto';

export class UpdateFondoDto extends PartialType(CreateFondoDto) {}
