import { Test, TestingModule } from '@nestjs/testing';
import { LifeService } from './life.service';

describe('LifeService', () => {
  let service: LifeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LifeService],
    }).compile();

    service = module.get<LifeService>(LifeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
