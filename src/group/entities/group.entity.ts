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

  @Column({
    type: 'enum',
    enum: ['Ekstraklasa', 'Okręgówka', 'IV', 'Klasa A', 'Klasa B'],
  })
  @ApiProperty({ enum: ['Ekstraklasa', 'Okręgówka', 'IV', 'Klasa A', 'Klasa B'], description: 'Liga' })
  league: string;

  @Column({
    type: 'enum',
    enum: ['Wałbrzych', 'Wrocław', 'Jelenia Góra', 'Legnica'],
    nullable: true,
  })
  @ApiProperty({ enum: ['Wałbrzych', 'Wrocław', 'Jelenia Góra', 'Legnica'], nullable: true, description: 'Okręg' })
  district: string;

  @ManyToOne(() => Season, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'season_id' })
  @ApiProperty({ description: 'Sezon rozgrywek' })
  season: Season;

  @OneToMany(() => Team, (team) => team.group)
  teams: Team[];
}
