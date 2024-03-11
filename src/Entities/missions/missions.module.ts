import { Module } from '@nestjs/common';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from './missions.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([Mission]),
 
  ],
  controllers: [MissionsController],
  providers: [MissionsService]
})
export class MissionsModule {}
