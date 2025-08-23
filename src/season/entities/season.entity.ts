import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Group } from '../../group/entities/group.entity';

@Entity('seasons')
export class Season {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID sezonu' })
  id: number;

  @Column({ type: 'varchar', length: 20 })
  @ApiProperty({ description: 'Nazwa sezonu, np. 2024/2025' })
  name: string;

  @OneToMany(() => Group, (group) => group.season)
  groups: Group[];
}
