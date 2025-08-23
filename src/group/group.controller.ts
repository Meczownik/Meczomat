import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Group } from './entities/group.entity';
import { Team } from 'src/teams/team.entity';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService:GroupService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz grupę po ID (z drużynami i sezonem)' })
  @ApiParam({ name: 'id', type: Number })
  async getGroupById(@Param('id') id:number):Promise<Group | null>{
    return this.groupService.getGroupById(Number(id));
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filtruj drużyny po lidze i okręgu' })
  @ApiQuery({ name: 'liga', required: true })
  @ApiQuery({ name: 'okreg', required: true})
  async filterByLigaAndOkreg(
    @Query('liga') liga:string,
    @Query('okreg') okreg:string,
  ): Promise<Team[]>{
    return this.groupService.filterByLigaAndOkreg(liga, okreg);
  }

  @Get('filter-name')
  @ApiOperation({ summary: 'Filtruj drużyny po nazwie, lidze i okręgu' })
  @ApiQuery({ name: 'name', required: true })
  @ApiQuery({ name: 'liga', required: true })
  @ApiQuery({ name: 'okreg', required: true})
  async filterByNameLigaOkreg(
    @Query('liga') liga: string,
    @Query('okreg') okreg: string,
    @Query('name') name: string,
  ): Promise<Team[]> {
    return this.groupService.filterByLigaOkregGrupa(liga, okreg, name);
  }

  @Get('filter-extended')
  @ApiOperation({ summary: 'Filtruj drużyny po lidze, okregu i grupie' })
  @ApiQuery({ name: 'liga', required: true })
  @ApiQuery({ name: 'okreg', required: true})
  @ApiQuery({ name: 'grupa', required: true })
  async filterByLigaOkregGrupa(
    @Query('liga') liga: string,
    @Query('okreg') okreg: string,
    @Query('grupa') grupa: string,
  ):Promise<Team[]>{
    return this.groupService.filterByLigaOkregGrupa(liga,okreg,grupa)
  }
}
