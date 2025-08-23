import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { Team } from '../teams/team.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async getGroupById(id:number): Promise<Group | null> {
    return this.groupRepository.findOne({
      where: { id },
      relations: ['teams','season']
    })
  }

  async filterByLigaAndOkreg(liga:string, okreg:string): Promise<Team[]>{
    return this.teamRepository
    .createQueryBuilder('team')
    .innerJoinAndSelect('team.group','lg')
    .where('LOWER(lg.league = LOWER(:liga)', { liga })
    .andWhere('LOWER(lg.district) = LOWER(:okreg)', { okreg })
    .getMany();
  }

  async filterByNameLigaOkreg(
    name: string,
    liga: string,
    okreg: string,
  ):Promise<Team[]>{
    return this.teamRepository
      .createQueryBuilder('team')
      .innerJoinAndSelect('team.group','lg')
      .where('LOWER(team.name) LIKE LOWER(:name)', { name: `%${name}%`})
      .andWhere('LOWER(lg.league) = LOWER(:liga)',{ liga })
      .andWhere('LOWER(lg.district) = LOWER(:okreg)', { okreg })
      .getMany();
  }

  async filterByLigaOkregGrupa(
    liga: string,
    okreg: string,
    grupa: string,
  ): Promise<Team[]> {
    return this.teamRepository
      .createQueryBuilder('team')
      .innerJoinAndSelect('team.group', 'lg')
      .where('LOWER(lg.league) = LOWER(:liga)', { liga })
      .andWhere('LOWER(lg.district) = LOWER(:okreg)', { okreg })
      .andWhere('LOWER(lg.name) = LOWER(:grupa)', { grupa })
      .getMany();
  }




}
