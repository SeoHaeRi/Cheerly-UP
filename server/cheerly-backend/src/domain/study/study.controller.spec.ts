import { Test, TestingModule } from '@nestjs/testing';
import { StudyController } from './study.controller';

describe('StudyController', () => {
  let controller: StudyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyController],
    }).compile();

    controller = module.get<StudyController>(StudyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
