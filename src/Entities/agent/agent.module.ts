import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from '../agencies/agencies.entity';
import { AgenciesModule } from '../agencies/agencies.module';
import { Agent } from './agent.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Agent, Agency]),
    AgenciesModule
  ],
  controllers: [AgentController],
  providers: [AgentService]
})
export class AgentModule {}
