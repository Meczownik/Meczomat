import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchService { 
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ){}

  async findAll(): Promise<Match[]> {
    return this.matchRepository.find({
      relations: ['homeTeam','awayTeam','group'],
      order: { matchDate: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['homeTeam','awayTeam', 'group'],
    });
    if (!match) {
      throw new NotFoundException(`Mecz o ID ${id} nie istnieje`)
    }
    return match;
  }
  
  async findByGroup(group_id: number): Promise<Match[]> {
    return this.matchRepository.find({
      where: { group: {id: group_id} },
      relations: ['homeTeam','awayTeam', 'group'],
      order: { matchDate: 'ASC'},
    });
  }

  async findByTeam(team_id: number): Promise<Match[]> {
    return this.matchRepository.find({
       where: [
      { homeTeam: { id: team_id } },
      { awayTeam: { id: team_id } },
    ],
    relations: ['homeTeam','awayTeam', 'group'],
    order: { matchDate: 'ASC'},
    });
  }

  async updateMatchResult(id: number, updateData: Partial<Match>): Promise<Match> {
    const match = await this.findOne(id);

    Object.assign(match, updateData);
    return this.matchRepository.save(match);
  }
}
