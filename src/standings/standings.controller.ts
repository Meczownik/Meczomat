import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StandingsService } from './standings.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('standings')
export class StandingsController {
  constructor(private readonly standingsService: StandingsService){}

  @Get(':group_id/calculate')
  @ApiOperation({ summary: 'Przelicz tabelę ligową dla danej grupy' })
  @ApiParam({ name: 'group_id', type: Number, description: 'ID grupy ligowej' })
  async calculate(@Param('group_id') group_id: number){
    return this.standingsService.calculateStandings(group_id);
  }

  @Get(':group_id')
  @ApiOperation({ summary: 'Pobierz aktualną tabelę ligową dla grupy' })
  @ApiParam({ name: 'group_id', type: Number, description: 'ID grupy ligowej' })
  async get(@Param('group_id') group_id: number) {
    return this.standingsService.getStandings(group_id);
  }

}

