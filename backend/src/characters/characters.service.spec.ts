import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { CharactersRepository } from './characters.repository';

describe('CharactersService', () => {
  let service: CharactersService;
  let repositoryMock: DeepMockProxy<CharactersRepository>;

  beforeEach(async () => {
    repositoryMock = mockDeep<CharactersRepository>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersService,
        { provide: CharactersRepository, useValue: repositoryMock }
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
  });

  // Test cases
  it('Should create a character correctly', async () => {
    const dto = { 
        name: 'Character 1', 
        description: 'A test character',
        species: 'Human'}

    const mockOutput = {
        id: 'uuid-generado-123',
        name: 'Character 1',
        description: 'A test character',
        species: 'Human',
        imageId: null,
        image: null}

    repositoryMock.create.mockResolvedValue(mockOutput);

    const result = await service.createCharacter(dto);
    expect(result).toEqual(mockOutput);
    expect(repositoryMock.create).toHaveBeenCalledWith(dto);
    expect(result.id).toBeDefined();
  });

  it('Should return all characters correctly', async() => {
    const mockCharacters = [
        {
            id: 'uuid-1',
            name: 'Character 1',
            description: 'A test character',
            species: 'Human',
            imageId: null,
            image: null}
        ,
        {
            id: 'uuid-2',
            name: 'Character 2',
            description: 'Another test character',
            species: 'Elf',
            imageId: null,
            image: null}
    ];
    repositoryMock.getAll.mockResolvedValue(mockCharacters);
    const result = await service.listAllCharacters();
    expect(result).toEqual(mockCharacters);
    expect(repositoryMock.getAll).toHaveBeenCalled();
    expect(result.length).toBe(2);
  });

});