import { Module } from '@nestjs/common';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from './missions.entity';
import { Transfer } from '../transfers/transfers.entity';
import { Agent } from '../agent/agent.entity';
import { Bus } from '../buses/buses.entity';
import { Driver } from '../drivers/driver.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([Mission, Transfer, Agent, Bus, Driver]),
 
  ],
  controllers: [MissionsController],
  providers: [MissionsService]
})
export class MissionsModule {}
