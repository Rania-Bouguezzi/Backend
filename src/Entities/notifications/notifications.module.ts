import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notifications.entity';
import { Agent } from '../agent/agent.entity';
import { AgentModule } from '../agent/agent.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Notification, Agent]),
    AgentModule
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService]
})
export class NotificationsModule {}
