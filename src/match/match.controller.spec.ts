import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';

describe('MatchController', () => {
  let controller: MatchController;
  let service: MatchService;

  const mockMatch: Match = {
    id: 1,
    homeGoals: 3,
    awayGoals: 2,
  } as Match;

   const mockService = {
    updateMatchResult: jest.fn().mockResolvedValue(mockMatch),
  };

   beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        {
          provide: MatchService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('powinien wywołac metode service.updateMatchResult i zwrócic aktualizowane dane', async () => {
    const dto: UpdateMatchDto = { homeGoals: 3};
    const result = await controller.update(1, dto);

    expect(service.updateMatchResult).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(mockMatch);
  });


});
