import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ) {}


    async findByOneId(id: number): Promise<Team | null>{
        return this.teamRepository
            .createQueryBuilder('team')
            .where('team.id  = :id', { id })
            .getOne();
    }

    async findAll(): Promise<Team[]> {
        return this.teamRepository.find({
            relations: ['group'],
        });
    }

    async findByName(name:string): Promise<Team[]>{
        return this.teamRepository
            .createQueryBuilder('team')
            .where('LOWER(team.name) LIKE LOWER(:name)', { name: `%${name}%`})
            .getMany();
    }

    /*
    async filterByLigaAndOkreg(liga: string, okreg: string): Promise<Team[]>{
        return this.teamRepository
            .createQueryBuilder('team')
            .innerJoinAndSelect('league_groups', 'lg', 'team.group_id = lg.id')
            .where('LOWER(lg.league) = LOWER(:liga)', { liga })
            .andWhere('LOWER(lg.district) = LOWER(:okreg)', { okreg })
            .getMany();
    }

    async filterByNameLigaOkreg(name: string, liga: string, okreg: string): Promise<Team[]>{
        return this.teamRepository
            .createQueryBuilder('team')
            .where('LOWER(team.Nazwa) LIKE LOWER(:name)', { name: `%${name}%` })
            .andWhere('LOWER(team.liga) = LOWER(:liga)', { liga })
            .andWhere('LOWER(team.okreg) = LOWER(:okreg)', { okreg })
            .getMany();
    }

    async filterByLigaOkregGrupa(
        liga: string,
        okreg: string,
        grupa: string
    ): Promise<Team[]> {
        return this.teamRepository
            .createQueryBuilder('team')
            .innerJoinAndSelect('league_groups', 'lg', 'team.group_id = lg.id')
            .where('LOWER(lg.league) = LOWER(:liga)', { liga })
            .andWhere('LOWER(lg.district) = LOWER(:okreg)', { okreg })
            .andWhere('LOWER(lg.name) = LOWER(:grupa)', { grupa })
            .getMany();
    }

    */
}
