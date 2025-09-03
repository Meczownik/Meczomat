import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { get } from 'http';

describe('MatchService', () => {
  let service: MatchService;
  let matchRepository: Repository<Match>;

  const mockMatch = {
    id:1,
    homeGoals: 1,
    awayGoals: 2,
  } as Match;

  const mockRepository = {
    findOne: jest.fn().mockResolvedValue(mockMatch),
    save: jest.fn().mockImplementation((match) => Promise.resolve(match)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: getRepositoryToken(Match),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
    matchRepository = module.get<Repository<Match>>(getRepositoryToken(Match));
  });

  //test utworzenia servicu
  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  //test aktualizacji wyniku meczu
  it('should update a match', async () => {
  const updateData = { homeGoals: 3 };
  const result = await service.updateMatchResult(1, updateData);

  expect(mockRepository.findOne).toHaveBeenCalledWith({
    where: { id: 1 },
    relations: ['homeTeam', 'awayTeam', 'group'],
  });

  expect(mockRepository.save).toHaveBeenCalledWith({
    ...mockMatch,
    homeGoals: 3,
  });
  expect(result.homeGoals).toBe(3);
  expect(result.awayGoals).toBe(2); 
});

});
