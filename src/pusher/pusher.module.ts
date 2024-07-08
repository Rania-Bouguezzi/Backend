import { Module } from '@nestjs/common';
import { Message } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PusherController } from './pusher.controller';
import { PusherService } from './pusher.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Message]),
    
      ],
      controllers: [PusherController],
      providers: [PusherService]
    })

export class PusherModule {}
