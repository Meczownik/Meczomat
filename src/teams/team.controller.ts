import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { TeamService } from "./team.service";
import { Team } from "./team.entity";

import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('teams') 
@Controller('teams')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}
    
    @Get()
    @ApiOperation({ summary: 'Pobieranie drużyn wraz z opcjonalnym filtorwaniem po nazwie' })
    @ApiQuery({ name: 'name', required: false})
    @ApiQuery({ name: 'liga', required: false})
    @ApiQuery({ name: 'okreg', required: false})
    async getAllTeams(
      @Query('name') name?: string,
      @Query('liga') liga?: string,
      @Query('okreg') okreg?: string,
    ): Promise<Team[]> {
        return this.teamService.findAll();
    }

    @Get('search')
    @ApiOperation({ summary: 'Szukaj drużyn po nazwie' })
    @ApiQuery({ name: 'name', required: true, description: 'Fragment nazwy drużyny' })
    async searchTeams(@Query('name') name: string): Promise<Team[]> {
      console.log('Szukana nazwa:', name);
      const teams = await this.teamService.findByName(name);

      if (!teams || teams.length === 0) {
        throw new NotFoundException('Nazwa klubu została niepoprawnie wpisana lub dany klub nie występuje na Dolnym Śląsku');
      }

      return teams || [];
    }

    @Get(':id')
    @ApiOperation({ summary: 'Pobieranie drużyny po jej id' })
    @ApiParam({ name: 'id', type: Number, description: 'Unikalne Id danej drużyny '})
    async getTeamById(@Param('id') id:string): Promise<Team> {
      const team = await this.teamService.findByOneId(Number(id));
      if (!team) {
        throw new NotFoundException(`Drużyna z tym identyfikatorem ${id} nie została znaleziona bądź nie istnieje`);
      }
      return team;
    }

}