import { Test, TestingModule } from '@nestjs/testing';
import { BookVersionsService } from './book-versions.service';

describe('BookVersionsService', () => {
  let service: BookVersionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookVersionsService],
    }).compile();

    service = module.get<BookVersionsService>(BookVersionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
