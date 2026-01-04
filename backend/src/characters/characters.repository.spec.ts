import { Test, TestingModule } from '@nestjs/testing';
import { CharactersRepository } from './characters.repository';

describe('CharactersService', () => {
  let service: CharactersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersRepository],
    }).compile();

    service = module.get<CharactersRepository>(CharactersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
