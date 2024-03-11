import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { Agency } from '../agencies/agencies.entity';
import { Mission } from '../missions/missions.entity';
import { AgenciesModule } from '../agencies/agencies.module';
import { MissionsModule } from '../missions/missions.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Driver, Agency, Mission]),
    AgenciesModule, MissionsModule
  ],
  controllers: [DriversController],
  providers: [DriversService]
})
export class DriversModule {}
