import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './teams/team.entity';
import { TeamService } from './teams/team.service';
import { TeamController } from './teams/team.controller';
import { MatchModule } from './match/match.module';
import { StandingsModule } from './standings/standings.module';
import { GroupModule } from './group/group.module';
import { SeasonModule } from './season/season.module';
import { Standing } from './standings/entities/standing.entity';
import { Match } from './match/entities/match.entity';
import { Season } from './season/entities/season.entity';
import { Group } from './group/entities/group.entity';
import { ScheduleModule } from '@nestjs/schedule';
//Ładuje zmienne środowiskowe (ConfigModule). 
// ✔ Łączy się z MySQL (TypeOrmModule.forRoot()). 
// ✔ Rejestruje encję Team w module (forFeature()). 
// ✔ Dodaje kontroler TeamController do obsługi żądań HTTP. 
// ✔ Dodaje serwis TeamService, który zarządza danymi drużyn.

@Module({
  imports: [
    
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Team, Group, Season, Match, Standing],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([Team, Group, Season, Match, Standing]),
    ScheduleModule.forRoot(),
    MatchModule,
    StandingsModule,
    GroupModule,
    SeasonModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class AppModule {}