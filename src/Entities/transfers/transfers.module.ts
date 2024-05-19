import { Module } from '@nestjs/common';
import { TransfersController } from './transfers.controller';
import { TransfersService } from './transfers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './transfers.entity';
import { Agency } from '../agencies/agencies.entity';
import { Mission } from '../missions/missions.entity';
import { AgenciesModule } from '../agencies/agencies.module';
import { MissionsModule } from '../missions/missions.module';
import { Agent } from '../agent/agent.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([Transfer, Agency, Agent]),
    AgenciesModule, MissionsModule
  ],
  controllers: [TransfersController],
  providers: [TransfersService]
})
export class TransfersModule {}
