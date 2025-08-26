import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Standing } from './entities/standing.entity';
import { Match } from 'src/match/entities/match.entity';
import { Team } from 'src/teams/team.entity';

@Injectable()
export class StandingsService { 
  constructor(
    @InjectRepository(Standing)
    private readonly standingsRepo: Repository<Standing>,
    @InjectRepository(Match)
    private readonly matchesRepo: Repository<Match>,
    @InjectRepository(Team)
    private readonly teamsRepo: Repository<Team>,
  ) {}

  async getStandings(group_id: number): Promise<Standing[]> {
  return this.standingsRepo.find({
    where: { group: { id: group_id } },
    relations: ['team', 'group'],
    order: {
      points: 'DESC',
      goalDifference: 'DESC',
      goalsFor: 'DESC',
    }
  });
  }
}
