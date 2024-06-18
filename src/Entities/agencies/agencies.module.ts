import { Module } from '@nestjs/common';
import { AgenciesController } from './agencies.controller';
import { AgenciesService } from './agencies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './agencies.entity';
import { SuperAgent } from '../super-agent/superAgent.entity';
import { SuperAgentService } from '../super-agent/super-agent.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([Agency, SuperAgent]),
   
  ],
  controllers: [AgenciesController],
  providers: [AgenciesService]
})
export class AgenciesModule {
  
}
