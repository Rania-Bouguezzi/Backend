import { Module } from '@nestjs/common';
import { BusesController } from './buses.controller';
import { BusesService } from './buses.service';
import { Bus } from './buses.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from '../agencies/agencies.entity';
import { Mission } from '../missions/missions.entity';
import { AgenciesModule } from '../agencies/agencies.module';
import { MissionsModule } from '../missions/missions.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Bus,Agency, Mission]),
    AgenciesModule, MissionsModule
  ],
  controllers: [BusesController],
  providers: [BusesService]
})
export class BusesModule {}
