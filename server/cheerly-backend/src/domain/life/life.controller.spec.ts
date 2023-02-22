import { Test, TestingModule } from '@nestjs/testing';
import { LifeController } from './life.controller';

describe('LifeController', () => {
  let controller: LifeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LifeController],
    }).compile();

    controller = module.get<LifeController>(LifeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
