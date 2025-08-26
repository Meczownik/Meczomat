import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Season } from '../../season/entities/season.entity';
import { Team } from '../../teams/team.entity';

@Entity('league_groups')
export class Group {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID grupy' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @ApiProperty({ description: 'Nazwa grupy, np. Gr. 1' })
  name: string;

  @Column({ name: 'district', type: 'varchar', length: 50, nullable: true, select: true })
  district: string;

  @ManyToOne(() => Season, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seasonId' })  
  season: Season;

  @Column({ name: 'league', type: 'varchar', length: 50 })
  league: string;

  @OneToMany(() => Team, (team) => team.group)
  teams: Team[];
}
