import { Module } from '@nestjs/common';
import { StandingsService } from './standings.service';
import { StandingsController } from './standings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Standing } from './entities/standing.entity';
import { Match } from 'src/match/entities/match.entity';
import { Team } from 'src/teams/team.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Standing,Match,Team])
  ],
  controllers: [StandingsController],
  providers: [StandingsService],
  exports: [StandingsService],
})
export class StandingsModule {}
