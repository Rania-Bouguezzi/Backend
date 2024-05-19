import { Module, forwardRef } from '@nestjs/common';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedbacks.entity';
import { Agent } from '../agent/agent.entity';
import { AgentModule } from '../agent/agent.module';
import { Mission } from '../missions/missions.entity';
import { MissionsModule } from '../missions/missions.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Feedback, Agent, Mission]),
    AgentModule, MissionsModule
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService]
})
export class FeedbacksModule {}
