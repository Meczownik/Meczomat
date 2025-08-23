import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Group } from '../group/entities/group.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID drużyny' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  @ApiProperty({ description: 'Nazwa drużyny' })
  name: string;

  @Column({
    type: 'enum',
    enum: ['Ekstraklasa', 'Okręgówka', 'IV', 'Klasa A', 'Klasa B'],
  })
  @ApiProperty({ enum: ['Ekstraklasa', 'Okręgówka', 'IV', 'Klasa A', 'Klasa B'], description: 'Liga' })
  liga: string;

  @Column({
    type: 'enum',
    enum: ['Wałbrzych', 'Wrocław', 'Jelenia Góra', 'Legnica'],
    nullable: true,
  })
  @ApiProperty({ enum: ['Wałbrzych', 'Wrocław', 'Jelenia Góra', 'Legnica'], nullable: true, description: 'Okręg' })
  okreg: string;

  @ManyToOne(() => Group, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'group_id' })
  @ApiProperty({ description: 'Przynależność do grupy w danym sezonie' })
  group: Group;
}