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

  @ManyToOne(() => Group, { nullable: true, onDelete: 'SET NULL' ,eager: true})
  @JoinColumn({ name: 'group_id' })
  @ApiProperty({ description: 'Przynależność do grupy w danym sezonie' })
  group: Group;
}