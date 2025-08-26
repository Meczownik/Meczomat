import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MatchService } from './match.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Match } from './entities/match.entity';

@ApiTags('matches')
@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService){}

  @Get('group/:group_id')
  @ApiOperation({ summary: " Pobierze wszsytkie mecze dla konkretnej grupy"})
  async findByGroup(@Param('group_id') group_id: string): Promise<Match[]>{
    return this.matchService.findByGroup(+group_id);
  }

  @Get('team/:teamId')
  @ApiOperation({ summary: "Pobierz wszystkie mecze dla konkretnej drużyny" })
  async findByTeam(@Param('teamId') teamId: string): Promise<Match[]> {
    return this.matchService.findByTeam(+teamId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz mecz po ID' })
  async findOne(@Param('id') id: string): Promise<Match>{
    return this.matchService.findOne(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz wszystkie mecze' })
  async findAll(): Promise<Match[]>{
    return this.matchService.findAll();
  }

}
