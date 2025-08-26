import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Group } from 'src/group/entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ) {}

    async findByOneId(id: number): Promise<Team | null> {
        return this.teamRepository.findOne({
        where: { id },
        relations: ['group'], 
    });
    }


    async findAll(): Promise<Team[]> {
        return this.teamRepository.find({
            relations: ['group'],
        });
    }

    async findByName(name:string): Promise<Team[]>{
        if (!name) return [];

        return await this.teamRepository
            .createQueryBuilder('team')
            .leftJoinAndSelect('team.group', 'group')
            .where('LOWER(team.name) LIKE LOWER(:name)', { name: `%${name}%`})
            .getMany();
    }

    
}
