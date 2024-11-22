import { Test, TestingModule } from '@nestjs/testing';
import { ModuloFinanzasController } from './modulo-finanzas.controller';
import { ModuloFinanzasService } from './modulo-finanzas.service';

describe('ModuloFinanzasController', () => {
  let controller: ModuloFinanzasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModuloFinanzasController],
      providers: [ModuloFinanzasService],
    }).compile();

    controller = module.get<ModuloFinanzasController>(ModuloFinanzasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
