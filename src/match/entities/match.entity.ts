import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from '../../teams/team.entity';
import { Group } from '../../group/entities/group.entity';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID meczu' })
  id: number;

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'home_team_id' })
  @ApiProperty({ description: 'Drużyna gospodarzy' })
  homeTeam: Team;

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'away_team_id' })
  @ApiProperty({ description: 'Drużyna gości' })
  awayTeam: Team;

  @ManyToOne(() => Group, { nullable: true, onDelete: 'SET NULL' })
  @ApiProperty({ description: 'Grupa, w której mecz się odbywa' })
  @JoinColumn({ name: 'group_id' })
  group: Group;
 
  @Column({ type: 'int', nullable: true })
  @ApiProperty({ description: 'Gole gospodarzy', nullable: true })
  homeGoals: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({ description: 'Gole gości', nullable: true })
  awayGoals: number;

  @Column({ type: 'timestamp' })
  @ApiProperty({ description: 'Data meczu' })
  matchDate: Date;
}