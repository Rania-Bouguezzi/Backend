import { Module, forwardRef } from '@nestjs/common';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedbacks.entity';
import { User } from '../users/users.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Feedback, User]),
    UsersModule
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService]
})
export class FeedbacksModule {}
