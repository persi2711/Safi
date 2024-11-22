import { Test, TestingModule } from '@nestjs/testing';
import { ModuloFinanzasService } from './modulo-finanzas.service';

describe('ModuloFinanzasService', () => {
  let service: ModuloFinanzasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuloFinanzasService],
    }).compile();

    service = module.get<ModuloFinanzasService>(ModuloFinanzasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
