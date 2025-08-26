import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from '../../teams/team.entity';
import { Group } from '../../group/entities/group.entity';

@Entity('standings')
export class Standing {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  @ApiProperty({ description: 'Drużyna w tabeli' })
  team: Team;

  @ManyToOne(() => Group, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  @ApiProperty({ description: 'Grupa, w której drużyna gra' })
  group: Group;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({ description: 'Punkty' })
  points: number;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({ description: 'Bramki zdobyte' })
  goalsFor: number;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({ description: 'Bramki stracone' })
  goalsAgainst: number;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({ description: 'Bilans bramkowy' })
  goalDifference: number;
}
