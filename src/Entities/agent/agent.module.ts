import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from '../agencies/agencies.entity';
import { AgenciesModule } from '../agencies/agencies.module';
import { Agent } from './agent.entity';
import { AuthAgentController } from './Auth/auth.controller';
import { AuthAgentService } from './Auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
    TypeOrmModule.forFeature([Agent, Agency]),
    AgenciesModule
  ],
  controllers: [AgentController, AuthAgentController],
  providers: [AgentService, AuthAgentService , JwtService, ConfigService]
})
export class AgentModule {}
