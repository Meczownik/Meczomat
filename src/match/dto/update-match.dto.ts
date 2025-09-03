import { PartialType } from '@nestjs/mapped-types';
import { CreateMatchDto } from './create-match.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
    
    @ApiProperty({ example: 3, description: 'Gole gospodarzy'})
    @IsOptional()
    @IsInt()
    @Min(0)
    homeGoals?: number;

    @ApiProperty({ example: 2, description: 'Gole gości'})
    @IsOptional()
    @IsInt()
    @Min(0)
    awayGoals?: number;

}
