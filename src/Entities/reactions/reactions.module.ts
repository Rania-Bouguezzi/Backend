import { Module, forwardRef } from '@nestjs/common';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './reactions.entity';
import { User } from '../users/users.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Reaction, User]),
    forwardRef(() => UsersModule)
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService]
})
export class ReactionsModule {}
