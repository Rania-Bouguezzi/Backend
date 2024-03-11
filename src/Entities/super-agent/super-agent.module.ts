import { Module } from '@nestjs/common';
import { SuperAgentController } from './super-agent.controller';
import { SuperAgentService } from './super-agent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAgent } from './superAgent.entity';
import { Agency } from '../agencies/agencies.entity';
import { AgenciesModule } from '../agencies/agencies.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([SuperAgent, Agency]),
    AgenciesModule
  ],
  controllers: [SuperAgentController],
  providers: [SuperAgentService]
})
export class SuperAgentModule {}
