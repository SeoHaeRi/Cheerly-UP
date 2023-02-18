import { Test, TestingModule } from '@nestjs/testing';
import { StudyService } from './study.service';

describe('StudyService', () => {
  let service: StudyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyService],
    }).compile();

    service = module.get<StudyService>(StudyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
