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

  async calculateStandings(group_id: number): Promise<Standing[]> {
    const matches = await this.matchesRepo.find({
      where: {group: { id:group_id } },
      relations: ['homeTeam', 'awayTeam', 'group'],
    });

    const teams = await this.teamsRepo.find({ where: { group: { id: group_id } } });

    const table = new Map<number, Standing>();

    for ( const team of teams){
      table.set(team.id, {
        team,
        group: team.group,
        position: 0,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        }as Standing);
    }

    for (const match of matches) {
      const home = table.get(match.homeTeam.id);
      const away = table.get(match.awayTeam.id);

      if (!home || !away) continue;

      home.goalsFor += match.homeGoals;
      home.goalsAgainst += match.awayGoals;
      away.goalsFor += match.awayGoals;
      away.goalsAgainst += match.homeGoals;

      if(match.homeGoals > match.awayGoals){
        home.points += 3;
      } else if (match.homeGoals < match.awayGoals){
        away.points += 3;
      } else {
        home.points += 1;
        away.points += 1;
      }

      home.goalDifference = home.goalsFor - home.goalsAgainst;
      away.goalDifference = away.goalsFor - away.goalsAgainst;
    }

    const standingsArray = Array.from(table.values()).sort((a, b) => {
      if(b.points !== a.points) return b.points - a.points;
      if(b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });

    standingsArray.forEach((s, i) => (s.position = i + 1));
    
    await this.standingsRepo.delete({ group: { id:group_id} });
    await this.standingsRepo.save(standingsArray);

    return standingsArray;
  }

  async getStandings(group_id: number): Promise<Standing[]> {
    return this.standingsRepo.find({
      where: {group: {id: group_id } },
      relations: ['team','group'],
      order: {position: 'ASC'},
    });
  }
}
