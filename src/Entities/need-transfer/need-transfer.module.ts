import { Module } from '@nestjs/common';
import { NeedTransferController } from './need-transfer.controller';
import { NeedTransferService } from './need-transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NeedTransfer } from './need-transfer.entity';
import { Agency } from '../agencies/agencies.entity';
import { Agent } from '../agent/agent.entity';
import { AgenciesModule } from '../agencies/agencies.module';
import { AgentModule } from '../agent/agent.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([NeedTransfer,Agency, Agent]),
    AgenciesModule, AgentModule
  ],
  controllers: [NeedTransferController],
  providers: [NeedTransferService]
})
export class NeedTransferModule {}
